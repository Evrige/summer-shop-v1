import { createSlice } from '@reduxjs/toolkit';
import {IProductCart} from "@/app/types/product.interface";
import {addToCart, deleteFromCart, getCartProducts, sendPayment} from "@/app/store/cart/cart.actions";

const initialState : IProductCart = {
	isLoading: false,
	products: [],
	quantity: 0
}
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.products.push(action.payload);
		},
		removeFromCart: (state, action) => {
			state.products = state.products.filter(item => item.id !== action.payload.id);
		},
		updateCartItemQuantity: (state, action) => {
			const { id, count } = action.payload;
			const item = state.products.find(item => item.id === id);
			if (item) item.count = count;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCartProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload;
				state.quantity = action.payload.length;
			})
			.addCase(getCartProducts.rejected, (state) => {
				state.isLoading = false;
				state.quantity = 0;
				state.products = [];
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				const newItem = action.meta.arg;

				state.products.push(newItem);
				state.quantity += 1;
			})
			.addCase(deleteFromCart.fulfilled, (state, action) => {
				const itemId = action.meta.arg;
				state.products = state.products.filter((product) => product.id !== itemId);
				state.quantity -= 1;
			})
			.addCase(sendPayment.fulfilled, (state) => {
				state.products = [];
				state.quantity = 0;
			});
	}
});

export default cartSlice.reducer;
