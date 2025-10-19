import React from 'react';
import PlusIcon from './icons/PlusIcon';
import SearchIcon from './icons/SearchIcon';

interface HeaderProps {
  onAddProduct: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddProduct, searchQuery, onSearchChange }) => {
  return (
    <header className="bg-brand-secondary shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center space-x-4">
        <div className="flex items-center space-x-3 flex-shrink-0">
          <svg className="w-8 h-8 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2.143 2.143 0 00-1.071-3.692 2.143 2.143 0 00-3.692-1.072m0 0a2.143 2.143 0 00-4.764 0 2.143 2.143 0 00-3.692 1.072M8.57 15.428a2.143 2.143 0 00-1.072 3.692 2.143 2.143 0 003.692 1.071m0 0a2.143 2.143 0 004.764 0 2.143 2.143 0 003.692-1.071m-4.764-4.764a2.143 2.143 0 010-4.764 2.143 2.143 0 010 4.764z" />
          </svg>
          <h1 className="text-2xl font-bold text-brand-text">ChemBase</h1>
        </div>

        <div className="relative flex-grow max-w-lg">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, formula, or CAS..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full bg-brand-background border border-gray-600 rounded-md py-2 pl-10 pr-3 text-brand-text placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary transition-colors"
            aria-label="Search products"
          />
        </div>

        <button
          onClick={onAddProduct}
          className="flex items-center space-x-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-400 transition-colors duration-300 shadow-lg flex-shrink-0"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
