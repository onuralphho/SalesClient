import { createSlice } from "@reduxjs/toolkit";

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
				JSON.stringify({ items: [] as TCartProducts[] } as ICart)
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
		addItem: (state, action: { payload: TCartProducts }) => {
			var temp = state.items.find((e) => e.sku === action.payload.sku);
			if (temp) {
				temp.quantity += 1;
				temp.totalPrice = temp.quantity * temp.price;
			} else {
				state.items.push(action.payload);
			}
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
	if (state.cart.items) {
		return state.cart.items.length;
	}
	return 0;
};

export const getTotalPrice = (state: { cart: ICart }) => {
	if (state.cart.items) {
		var totalPrice = 0;
		state.cart.items.forEach((e) => (totalPrice += e.totalPrice));
		return totalPrice;
	}
	return 0;
};

export default cartSlice.reducer;
