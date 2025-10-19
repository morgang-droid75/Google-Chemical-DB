
import React, { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { generateProductInfo } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';
import XIcon from './icons/XIcon';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'imageUrl'>>({
    name: '',
    formula: '',
    casNumber: '',
    description: '',
    safetyInfo: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        formula: product.formula,
        casNumber: product.casNumber,
        description: product.description,
        safetyInfo: product.safetyInfo,
      });
    } else {
      setFormData({
        name: '',
        formula: '',
        casNumber: '',
        description: '',
        safetyInfo: '',
      });
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateInfo = useCallback(async () => {
    if (!formData.name && !formData.formula) {
      setError('Please provide a name or formula to generate information.');
      return;
    }
    setError('');
    setIsGenerating(true);
    try {
      const productIdentifier = formData.name || formData.formula;
      const generatedData = await generateProductInfo(productIdentifier);
      setFormData(prev => ({
        ...prev,
        description: generatedData.description,
        safetyInfo: generatedData.safetyInfo,
      }));
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsGenerating(false);
    }
  }, [formData.name, formData.formula]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.formula) {
      setError('Product name and formula are required.');
      return;
    }
    setError('');
    const savedProduct: Product = {
      ...formData,
      id: product?.id || '',
      imageUrl: product?.imageUrl || `https://picsum.photos/seed/${formData.name.replace(/\s/g, '')}/400/300`
    };
    onSave(savedProduct);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-brand-secondary rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-brand-primary">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-2 rounded-md">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Product Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full bg-brand-background border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="formula" className="block text-sm font-medium text-gray-300">Chemical Formula</label>
              <input type="text" name="formula" id="formula" value={formData.formula} onChange={handleChange} className="mt-1 block w-full bg-brand-background border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
          </div>
          <div>
            <label htmlFor="casNumber" className="block text-sm font-medium text-gray-300">CAS Number</label>
            <input type="text" name="casNumber" id="casNumber" value={formData.casNumber} onChange={handleChange} className="mt-1 block w-full bg-brand-background border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <button
              type="button"
              onClick={handleGenerateInfo}
              disabled={isGenerating}
              className="w-full flex justify-center items-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  <span>Generate Description & Safety Info with AI</span>
                </>
              )}
            </button>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full bg-brand-background border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div>
            <label htmlFor="safetyInfo" className="block text-sm font-medium text-gray-300">Safety Information</label>
            <textarea name="safetyInfo" id="safetyInfo" value={formData.safetyInfo} onChange={handleChange} rows={4} className="mt-1 block w-full bg-brand-background border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300">Cancel</button>
            <button type="submit" className="bg-brand-primary text-white py-2 px-4 rounded-lg hover:bg-teal-400 transition-colors duration-300">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
   