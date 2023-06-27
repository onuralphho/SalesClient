import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const saveStateToLocalStorage = (state: ICart) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("cartDetails", serializedState);
	} catch (error) {
		return undefined;
	}
};

const loadStateFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem("cartDetails");
		if (serializedState === null) {
			localStorage.setItem(
				"cartDetails",
				JSON.stringify({ items: [] as IProducts[] } as ICart)
			);
			return;
		}
		return JSON.parse(serializedState);
	} catch (error) {
		return undefined;
	}
};

const persistedState = loadStateFromLocalStorage() as ICart;

const cartSlice = createSlice({
	name: "cart",
	initialState: persistedState,
	reducers: {
		addItem: (state, action) => {
			state.items.push(action.payload);
			saveStateToLocalStorage(state);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter((item) => item.sku !== action.payload.sku);
			saveStateToLocalStorage(state);
		},
	},
});

export const { addItem, removeItem } = cartSlice.actions;

export const getItemsLength = (state: { cart: ICart }) => {
	if (state && state.cart && state.cart.items) {
		return state.cart.items.length;
	}
	return 0;
};

export default cartSlice.reducer;
