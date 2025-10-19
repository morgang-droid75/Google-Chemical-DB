
import React from 'react';
import PlusIcon from './icons/PlusIcon';

interface HeaderProps {
  onAddProduct: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {
  return (
    <header className="bg-brand-secondary shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2.143 2.143 0 00-1.071-3.692 2.143 2.143 0 00-3.692-1.072m0 0a2.143 2.143 0 00-4.764 0 2.143 2.143 0 00-3.692 1.072M8.57 15.428a2.143 2.143 0 00-1.072 3.692 2.143 2.143 0 003.692 1.071m0 0a2.143 2.143 0 004.764 0 2.143 2.143 0 003.692-1.071m-4.764-4.764a2.143 2.143 0 010-4.764 2.143 2.143 0 010 4.764z" />
          </svg>
          <h1 className="text-2xl font-bold text-brand-text">ChemBase</h1>
        </div>
        <button
          onClick={onAddProduct}
          className="flex items-center space-x-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-400 transition-colors duration-300 shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
   