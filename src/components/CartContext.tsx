import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for cart count
const CartContext = createContext<{ keranjangCount: number; setKeranjangCount: React.Dispatch<React.SetStateAction<number>> } | undefined>(undefined);

// Type for the props of CartProvider
type CartProviderProps = {
  children: React.ReactNode; // This ensures children can be any valid React node (elements, strings, numbers, etc.)
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [keranjangCount, setKeranjangCount] = useState<number>(0);

  useEffect(() => {
    // Load the cart count from localStorage whenever the component mounts
    const storedKeranjang = JSON.parse(localStorage.getItem('keranjang') || '[]');
    setKeranjangCount(storedKeranjang.length);
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
