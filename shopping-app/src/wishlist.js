import React, { createContext, useState } from 'react';

// Create the WishlistContext
export const WishlistContext = createContext();

// Create the WishlistProvider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Function to add a product to the wishlist
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product._id !== productId)
    );
  };

  // Value object containing the context state and functions
  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  // Provide the context value to the children components
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};