import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  cart: [], // Start with an empty array, will be populated later
};

// Create a slice for the cart with initial state and reducers
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer to set the cart state
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    // Reducer to add an item to the cart
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    // Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
    },
    // Reducer to increment the quantity of an item in the cart
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    // Reducer to decrement the quantity of an item in the cart
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => item._id !== action.payload._id
          );
        } else {
          itemPresent.quantity--;
        }
      }
    },
    // Reducer to clean the cart (remove all items)
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;