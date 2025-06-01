import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../lib/types';

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
        >
          <span className="mb-2 text-3xl">{category.icon}</span>
          <span className="text-sm font-medium text-gray-900">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}