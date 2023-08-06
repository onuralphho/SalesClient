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
				JSON.stringify({
					items: [] as TCartProducts[],
					address: "test adress",
					paymentMethod: "cash",
				} as ICart)
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
	initialState: { ...persistedState },
	reducers: {
		addItem: (state, action: { payload: TCartProducts }) => {
			var product = state.items.find((e) => e.sku === action.payload.sku);
			if (product) {
				product.quantity += 1;
			} else {
				state.items.push(action.payload);
			}
			saveStateToLocalStorage(state);
		},
		removeItem: (state, action) => {
			state.items = state.items.filter((item) => item.sku !== action.payload.sku);
			saveStateToLocalStorage(state);
		},
		completeOrder: (state, action) => {
			state.items = [];
			saveStateToLocalStorage(state);
		},
	},
});

export const { addItem, removeItem, completeOrder } = cartSlice.actions;

export const getItemsLength = (state: { cart: ICart }) => {
	if (state.cart.items) {
		return state.cart.items.length;
	}
	return 0;
};

export const getTotalPrice = (state: { cart: ICart }) => {
	if (state.cart.items) {
		var totalPrice = 0;
		state.cart.items.forEach((e) => (totalPrice += e.price * e.quantity));
		return totalPrice;
	} else {
		return 0;
	}
};

export default cartSlice.reducer;
