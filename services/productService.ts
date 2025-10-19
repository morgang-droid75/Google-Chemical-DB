import type { Product } from '../types';

const STORAGE_KEY = 'chembase_products';

const seedData: Product[] = [
  {
    id: '1',
    name: 'Sodium Chloride',
    formula: 'NaCl',
    casNumber: '7647-14-5',
    description: 'A common salt, an ionic compound with the chemical formula NaCl, representing a 1:1 ratio of sodium and chloride ions. It is responsible for the salinity of seawater and of the extracellular fluid of many multicellular organisms.',
    safetyInfo: '* Generally recognized as safe (GRAS). * Excessive consumption can lead to hypernatremia. * Avoid contact with eyes.',
    imageUrl: 'https://picsum.photos/seed/nacl/400/300'
  },
  {
    id: '2',
    name: 'Ethanol',
    formula: 'C2H5OH',
    casNumber: '64-17-5',
    description: 'A simple alcohol with the chemical formula C2H5OH. It is a volatile, flammable, colorless liquid with a characteristic wine-like odor and pungent taste. It is used as an antiseptic, a solvent, and a fuel.',
    safetyInfo: '* Highly flammable. Keep away from heat and open flames. * Causes serious eye irritation. * May cause drowsiness or dizziness.',
    imageUrl: 'https://picsum.photos/seed/ethanol/400/300'
  }
];

// Function to get all products. Seeds data if localStorage is empty.
export const getProducts = (): Product[] => {
  try {
    const productsJson = localStorage.getItem(STORAGE_KEY);
    if (!productsJson) {
      // If no data, seed it
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return seedData;
    }
    return JSON.parse(productsJson);
  } catch (error) {
    console.error("Error reading products from localStorage", error);
    return [];
  }
};

// Function to save a product (either add new or update existing)
export const saveProduct = (product: Product): void => {
  const products = getProducts();
  
  // If product has no ID, it's a new one
  if (!product.id) {
    product.id = Date.now().toString();
    products.push(product);
  } else {
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      // Update existing
      products[index] = product;
    } else {
      // If ID provided but not found, add it anyway
      products.push(product);
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage", error);
  }
};

// Function to delete a product by its ID
export const deleteProduct = (id: string): void => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage after deletion", error);
  }
};
