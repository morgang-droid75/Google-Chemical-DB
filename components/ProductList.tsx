import React from 'react';
import type { Product } from '../types';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, onView }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-400">No Products Found</h2>
        <p className="text-gray-500 mt-2">Click "Add Product" to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} onView={onView} />
      ))}
    </div>
  );
};

export default ProductList;