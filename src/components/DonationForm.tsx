import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { donationSchema } from '../lib/validation';
import { handleError, ErrorDetails } from '../lib/errorHandling';
import { invokeSafeFunction } from '../lib/api';
import { formatCurrency } from '../lib/utils';

// Define form data interface based on our schema
type DonationFormData = {
  amount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: 'creditCard' | 'paypal' | 'bankTransfer';
};

interface DonationFormProps {
  campaignId: string;
  campaignTitle: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

const suggestionAmounts = [5, 10, 25, 50, 100];

export function DonationForm({
  campaignId,
  campaignTitle,
  onSuccess,
  onCancel,
  className = '',
}: DonationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState(false);

  // Initialize form with validation schema
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 10,
      isAnonymous: false,
      paymentMethod: 'creditCard',
    },
  });

  const watchAmount = watch('amount');
  const watchIsAnonymous = watch('isAnonymous');

  // Handle suggested amount selection
  const selectAmount = (amount: number) => {
    setValue('amount', amount);
    setCustomAmount(false);
  };

  // Enable custom amount input
  const enableCustomAmount = () => {
    setCustomAmount(true);
    // Focus the input (using setTimeout to ensure the input is rendered)
    setTimeout(() => {
      const amountInput = document.getElementById('amount');
      if (amountInput) amountInput.focus();
    }, 0);
  };

  // Submit handler with CSRF protection
  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Call Stripe checkout with CSRF protection via our utility
      const checkoutResult = await invokeSafeFunction('stripe-checkout', {
        campaignId,
        amount: data.amount * 100, // Convert to cents for Stripe
        donorName: data.isAnonymous ? 'Anonymous' : data.donorName,
        donorEmail: data.donorEmail,
        message: data.message || '',
        isAnonymous: data.isAnonymous,
        paymentMethod: data.paymentMethod,
      });

      if (!checkoutResult || !checkoutResult.url) {
        throw new Error('Could not create checkout session');
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutResult.url;
      
      // Call success callback if provided
      if (onSuccess) onSuccess();
      
    } catch (error) {
      // Use standardized error handling
      const errorDetails: ErrorDetails = handleError(error);
      setFormError(errorDetails.message);
      toast.error(errorDetails.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <h2 className="mb-4 text-xl font-bold text-blue-900">
        Donate to {campaignTitle}
      </h2>

      {formError && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Amount selection */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Donation Amount
          </label>
          <div className="mb-2 flex flex-wrap gap-2">
            {suggestionAmounts.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant={watchAmount === amount ? 'primary' : 'secondary'}
                onClick={() => selectAmount(amount)}
                className="flex-1"
              >
                {formatCurrency(amount)}
              </Button>
            ))}
            <Button
              type="button"
              variant={customAmount ? 'primary' : 'secondary'}
              onClick={enableCustomAmount}
              className="flex-1"
            >
              Custom
            </Button>
          </div>

          {customAmount && (
            <div>
              <input
                id="amount"
                type="number"
                {...register('amount', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter amount"
                min={1}
                step={1}
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amount.message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Anonymous toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAnonymous"
            {...register('isAnonymous')}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="isAnonymous"
            className="ml-2 block text-sm text-gray-700"
          >
            Donate anonymously
          </label>
        </div>

        {/* Name (if not anonymous) */}
        {!watchIsAnonymous && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              {...register('donorName')}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.donorName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.donorName.message}
              </p>
            )}
          </div>
        )}

        {/* Email (always required) */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            {...register('donorEmail')}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.donorEmail && (
            <p className="mt-1 text-sm text-red-600">
              {errors.donorEmail.message}
            </p>
          )}
        </div>

        {/* Optional message */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Message (Optional)
          </label>
          <textarea
            {...register('message')}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
            placeholder="Add a message of support (will be shown with your donation)"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Payment method */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <div className="flex gap-2">
            <label className="flex-1">
              <input
                type="radio"
                value="creditCard"
                {...register('paymentMethod')}
                className="mr-2 h-4 w-4"
              />
              Credit Card
            </label>
            <label className="flex-1">
              <input
                type="radio"
                value="paypal"
                {...register('paymentMethod')}
                className="mr-2 h-4 w-4"
              />
              PayPal
            </label>
            <label className="flex-1">
              <input
                type="radio"
                value="bankTransfer"
                {...register('paymentMethod')}
                className="mr-2 h-4 w-4"
              />
              Bank Transfer
            </label>
          </div>
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : `Donate ${formatCurrency(watchAmount)}`}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
