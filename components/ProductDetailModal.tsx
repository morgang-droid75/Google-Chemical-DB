import React from 'react';
import type { Product } from '../types';
import XIcon from './icons/XIcon';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const safetyPoints = product.safetyInfo
    .split('*')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <div 
        className="bg-brand-secondary rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-brand-secondary">
          <h2 id="product-detail-title" className="text-2xl font-bold text-brand-primary">{product.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close modal">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </div>
            <div>
              <div className="mb-4">
                <p className="text-lg font-mono text-gray-400">{product.formula}</p>
                <p className="text-sm text-gray-500">CAS: {product.casNumber}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-brand-text mb-2">Description</h3>
                <p className="text-brand-text/90">{product.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-text mb-2">Safety Information</h3>
                {safetyPoints.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2 text-brand-text/90">
                    {safetyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No safety information provided.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
