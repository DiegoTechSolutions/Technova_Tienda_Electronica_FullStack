import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
        loading: false
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return {
        ...state,
        items: updatedItems
      };
    
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(filteredItems));
      return {
        ...state,
        items: filteredItems
      };
    
    case 'UPDATE_QUANTITY':
      const itemsWithUpdatedQuantity = state.items.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      localStorage.setItem('cart', JSON.stringify(itemsWithUpdatedQuantity));
      return {
        ...state,
        items: itemsWithUpdatedQuantity
      };
    
    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return {
        ...state,
        items: []
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: true
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    dispatch({ type: 'LOAD_CART', payload: savedCart ? JSON.parse(savedCart) : [] });
  }, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart: state.items,
    loading: state.loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};