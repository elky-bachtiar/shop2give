import React, { useState } from 'react';
import { Button } from './ui/Button';
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';

type CheckoutButtonProps = {
  productId: keyof typeof products;
  className?: string;
};

export function CheckoutButton({ productId, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const product = products[productId];

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const url = await createCheckoutSession(
        product.priceId,
        product.mode,
        `${window.location.origin}/success`,
        `${window.location.origin}/cancel`,
      );
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Loading...' : `Buy Now - €${product.price}`}
    </Button>
  );
}