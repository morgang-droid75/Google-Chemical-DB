import React, { useState, useCallback, useEffect } from 'react';
import type { Product } from './types';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import ProductDetailModal from './components/ProductDetailModal';
import * as productService from './services/productService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load products from the "backend" service on initial render
    setProducts(productService.getProducts());
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingProduct(null);
  }, []);

  const handleViewProduct = useCallback((product: Product) => {
    setViewingProduct(product);
  }, []);

  const closeDetailModal = useCallback(() => {
    setViewingProduct(null);
  }, []);

  const handleAddProduct = useCallback(() => {
    setEditingProduct(null);
    openModal();
  }, [openModal]);

  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product);
    openModal();
  }, [openModal]);

  const handleDeleteProduct = useCallback((id: string) => {
    productService.deleteProduct(id);
    setProducts(productService.getProducts()); // Refresh list from service
  }, []);

  const handleSaveProduct = useCallback((product: Product) => {
    productService.saveProduct(product);
    setProducts(productService.getProducts()); // Refresh list from service
    closeModal();
  }, [closeModal]);

  return (
    <div className="min-h-screen bg-brand-background">
      <Header onAddProduct={handleAddProduct} />
      <main className="container mx-auto p-4 md:p-8">
        <ProductList 
          products={products} 
          onEdit={handleEditProduct} 
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
        />
      </main>
      {isModalOpen && (
        <ProductModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      )}
      <ProductDetailModal
        product={viewingProduct}
        onClose={closeDetailModal}
      />
    </div>
  );
};

export default App;
