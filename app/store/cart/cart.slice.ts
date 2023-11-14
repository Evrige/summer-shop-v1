import { createSlice } from '@reduxjs/toolkit';
import {IProductCart} from "@/app/types/product.interface";
import {addToCart, deleteFromCart, getCartProducts, sendPayment} from "@/app/store/cart/cart.actions";

const initialState : IProductCart = {
	isLoading: false,
	products: [],
	total: 0
}
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setTotal: (state) => {
			state.total = state.products.reduce((accumulator, product) => {
				return accumulator + product.price * product.count;
			}, 0);
		},
		setItemCount: (state, action) => {
			state.products = state.products.map((product) =>
				product.id === action.payload.id ? { ...product, count: Math.max(1, action.payload.count) } : product
			)

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
				cartSlice.caseReducers.setTotal(state);
			})
			.addCase(getCartProducts.rejected, (state) => {
				state.isLoading = false;
				state.products = [];
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				const newItem = action.meta.arg;
				cartSlice.caseReducers.setTotal(state);
				state.products.push(newItem.product);
				console.log(state.products)
			})
			.addCase(deleteFromCart.fulfilled, (state, action) => {
				const itemId = action.meta.arg;
				state.products = state.products.filter((product) => product.id !== itemId);
				cartSlice.caseReducers.setTotal(state);
			})
			.addCase(sendPayment.fulfilled, (state) => {
				state.products = [];
				state.total = 0;
			});
	}
});
export const { setTotal, setItemCount } = cartSlice.actions;
