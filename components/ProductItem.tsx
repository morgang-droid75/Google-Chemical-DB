import React from 'react';
import type { Product } from '../types';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit, onDelete, onView }) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <div 
      className="bg-brand-secondary rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"
      onClick={() => onView(product)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onView(product); }}
      aria-label={`View details for ${product.name}`}
    >
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-brand-primary mb-2">{product.name}</h3>
        <p className="text-lg font-mono text-gray-400">{product.formula}</p>
        <p className="text-sm text-gray-500 mb-4">CAS: {product.casNumber}</p>
        <p className="text-brand-text mb-4 flex-grow">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-700 flex justify-end space-x-3">
          <button onClick={handleEdit} className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full" aria-label={`Edit ${product.name}`}>
            <EditIcon className="w-5 h-5" />
          </button>
          <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full" aria-label={`Delete ${product.name}`}>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;