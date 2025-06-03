import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { products } from '../data/products';
import ProductDetail from '../components/product/ProductDetail';
import { Product as ProductType } from '../types';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  
  // Convert the product from data/products.ts format to our Product type
  const formattedProduct = product ? {
    id: product.id,
    name: product.title, // Map title to name
    description: 'Beautiful product from our collection', // Add default description
    price: product.price,
    imageUrl: product.imageUrl,
    category: 'general', // Default category
    priceId: 'price_1234', // Default Stripe price ID
    campaignId: product.campaignId,
  } as ProductType : null;

  if (!formattedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Use our new ProductDetail component */}
        <ProductDetail product={formattedProduct} />
      </main>
      <Footer />
    </div>
  );
}