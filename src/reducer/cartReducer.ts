import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.sku !== action.payload);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ sku: string; quantity: number }>
    ) => {
      const { sku, quantity } = action.payload;
      const item = state.items.find((item) => item.sku === sku);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
