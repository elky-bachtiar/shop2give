import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedCategories } from '../components/FeaturedCategories';

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
          <p className="mt-2 text-gray-600">
            Browse fundraisers by category to find causes you care about
          </p>
        </div>
        <CategoryGrid />
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Featured Categories</h2>
          <FeaturedCategories />
        </div>
      </main>
      <Footer />
    </div>
  );
}