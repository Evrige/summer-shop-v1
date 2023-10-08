import {EnumSaveData, IInitialState} from "@/app/types/user.interface";
import {createSlice} from "@reduxjs/toolkit";
import {checkAuth, login, logout, registration} from "@/app/store/user/user.actions";
import {getStorageLocal} from "@/app/utils/local-storage";
import {errorCatch} from "@/app/api/api.helper";
import {IInitialProducts} from "@/app/types/product.interface";
import {
	createProduct, deleteProduct,
	getBrands,
	getCategory, getProductDetail,
	getProducts,
	getSizes,
	updateProduct
} from "@/app/store/products/products.actions";

const initialState: IInitialProducts = {
	products: [],
	brands: [],
	category: [],
	sizes: [],
	productDetail: null,
	isLoading: false
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
				state.isLoading = true
		})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.isLoading = false
				// @ts-ignore
				state.products = action.payload
			})
			.addCase(getProducts.rejected, (state) => {
				state.isLoading = false
				state.products = []
			})
			.addCase(getProductDetail.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getProductDetail.fulfilled, (state, action) => {
				state.isLoading = false
				// @ts-ignore
				state.productDetail = action.payload
			})
			.addCase(getProductDetail.rejected, (state) => {
				state.isLoading = false
				state.productDetail = null
			})
			.addCase(getBrands.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getBrands.fulfilled, (state, action) => {
				state.isLoading = false
				// @ts-ignore
				state.brands = action.payload
			})
			.addCase(getBrands.rejected, (state) => {
				state.isLoading = false
				state.brands = []
			})
			.addCase(getCategory.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getCategory.fulfilled, (state, action) => {
				state.isLoading = false
				// @ts-ignore
				state.category = action.payload
			})
			.addCase(getCategory.rejected, (state) => {
				state.isLoading = false
				state.category = []
			})
			.addCase(getSizes.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getSizes.fulfilled, (state, action) => {
				state.isLoading = false
				// @ts-ignore
				state.sizes = action.payload
			})
			.addCase(getSizes.rejected, (state) => {
				state.isLoading = false
				state.sizes = []
			})
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createProduct.fulfilled, (state) => {
				state.isLoading = false
				state.productDetail = null
			})
			.addCase(createProduct.rejected, (state) => {
				state.isLoading = false
			})
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true
				state.productDetail = null
			})
			.addCase(updateProduct.fulfilled, (state) => {
				state.isLoading = false
			})
			.addCase(updateProduct.rejected, (state) => {
				state.isLoading = false
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deleteProduct.fulfilled, (state) => {
				state.isLoading = false
			})
			.addCase(deleteProduct.rejected, (state) => {
				state.isLoading = false
			})
	}
})