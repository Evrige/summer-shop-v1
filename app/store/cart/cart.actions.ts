import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartService} from "@/app/service/cart.service";
import {IProductCartItem, IProductResponse} from "@/app/types/product.interface";

export const getCartProducts = createAsyncThunk<IProductCartItem[]>(
	'cart/getCart',
	async (_, thunkApi) => {
		try {
			return await CartService.getCartProducts()
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
export const addToCart = createAsyncThunk<string, IProductCartItem>(
	'cart/addToCart',
	async (data, thunkApi) => {
		try {
			return await CartService.addToCart(data)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
export const deleteFromCart = createAsyncThunk<string, number>(
	'cart/deleteFromCart',
	async (id, thunkApi) => {
		try {
			return await CartService.deleteFromCart(id)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
export const sendPayment = createAsyncThunk<string>(
	'cart/sendPayment',
	async (_, thunkApi) => {
		try {
			return await CartService.sendPayment()
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

