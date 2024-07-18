// src/redux/slice/cart.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

interface CartItem {
  brand: ReactNode;
  title: ReactNode;
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalItems, subtotal };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.items[index].quantity < state.items[index].stock) {
        state.items[index].quantity += 1;
        const { totalItems, subtotal } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.subtotal = subtotal;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
        const { totalItems, subtotal } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.subtotal = subtotal;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.items.splice(index, 1);
      const { totalItems, subtotal } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.subtotal = subtotal;
    },
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(
        (i) => i._id === item._id
      );
      if (existingItemIndex !== -1) {
        if (
          state.items[existingItemIndex].quantity <
          state.items[existingItemIndex].stock
        ) {
          state.items[existingItemIndex].quantity += 1;
        }
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      const { totalItems, subtotal } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.subtotal = subtotal;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addItemToCart,
  clearCart ,
} = cartSlice.actions;

export default cartSlice.reducer;
