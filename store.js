// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '././features/CartReducer.js'; // Adjust the import path as needed

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;