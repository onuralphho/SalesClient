import { createSlice, PayloadAction } from "@reduxjs/toolkit";



var localCart = localStorage.getItem("cart");

const initialState: CartState = {
	items: localCart && JSON.parse(localCart),
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ICartProduct>) => {
			state.items.push(action.payload);
			return;
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.sku !== action.payload);
			return;
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
