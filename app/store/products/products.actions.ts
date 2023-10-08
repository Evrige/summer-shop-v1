import {createAsyncThunk} from "@reduxjs/toolkit";
import {IBrandCategory, IProduct, IProductResponse} from "@/app/types/product.interface";
import {ProductService} from "@/app/service/product.service";

export const getProducts = createAsyncThunk<IProductResponse>(
	'products/getAll',
	async () =>{
		try {
			return await ProductService.getProducts()
		} catch (e) {
			return e
		}
	}
)
export const getProductDetail = createAsyncThunk<IProduct>(
	'products/getProductDetail',
	async (data, thunkAPI) =>{
		try {
			return await ProductService.getProductDetail(data)
		} catch (e) {
			return e
		}
	}
)
export const getBrands = createAsyncThunk<IBrandCategory[]>(
	'products/getBrands',
	async () =>{
		try {
			return await ProductService.getBrands()
		} catch (e) {
			return e
		}
	}
)

export const getCategory = createAsyncThunk<IBrandCategory[]>(
	'products/getCategory',
	async () =>{
		try {
			return await ProductService.getCategory()
		} catch (e) {
			return e
		}
	}
)

export const getSizes = createAsyncThunk<IBrandCategory[]>(
	'products/getSizes',
	async () =>{
		try {
			return await ProductService.getSizes()
		} catch (e) {
			return e
		}
	}
)

export const createProduct = createAsyncThunk<string>(
	'product/createProduct',
	async (data, thunkApi) =>{
		try {
			return await ProductService.createProduct(data)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const updateProduct = createAsyncThunk<string>(
	'product/updateProduct',
	async (data, thunkApi) =>{
		try {
			// @ts-ignore
			return await ProductService.updateProduct(data)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const deleteProduct = createAsyncThunk<string>(
	'product/deleteProduct',
	async (data, thunkApi) =>{
		try {
			return await ProductService.deleteProduct(data)
		} catch (e) {
			return e
		}
	}
)