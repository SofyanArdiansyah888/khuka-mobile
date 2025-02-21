import React, { createContext, useContext, useState, useEffect } from 'react';
import {getItem} from '../utils/khukhaDBTemp'
// Create a context for cart count
const CartContext = createContext<{ keranjangCount: number; setKeranjangCount: React.Dispatch<React.SetStateAction<number>> } | undefined>(undefined);

// Type for the props of CartProvider
type CartProviderProps = {
  children: React.ReactNode; // This ensures children can be any valid React node (elements, strings, numbers, etc.)
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [keranjangCount, setKeranjangCount] = useState<number>(0);

  useEffect(() => {
    const loadKeranjang = async () => {
      const storedKeranjang = JSON.parse((await getItem('keranjang')) || '[]');
      setKeranjangCount(storedKeranjang.length);
    };

    loadKeranjang();
  }, []);

  return (
    <CartContext.Provider value={{ keranjangCount, setKeranjangCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
