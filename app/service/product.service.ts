import instance from "@/app/api/api.interseptor";
import {IProductProperty, IProduct, IProductResponse, IProductProperty} from "@/app/types/product.interface";
import {getAccessToken} from "@/app/service/auth/auth.helper";
import axios from "axios";

export const ProductService = {
	async getProducts(){
			return instance<IProductResponse[]>({
				url: `${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}`,
				method: 'GET',
			})
	},
	async getProductDetail(id:number, userId: number){
		return instance<IProduct>({
				url: `${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}/${id}?u=${userId}`,
				method: 'GET',
			})
	},
	async getBrands(){
		return instance<IProductProperty[]>({
				url: process.env.NEXT_PUBLIC_GET_ALL_BRAND_URL,
				method: 'GET',
			})
	},
	async getCategory(){
		return instance<IProductProperty[]>({
				url: process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_URL,
				method: 'GET',
			})
	},
	async getSizes(){
		return instance<IProductProperty[]>({
				url: process.env.NEXT_PUBLIC_GET_ALL_SIZE_URL,
				method: 'GET',
			})
	},

	// ADMIN REQUESTS
	async createProduct(formData: FormData){
		const accessToken = getAccessToken()
		return axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_CREATE_PRODUCT_URL}`,
				formData,
				{
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${accessToken}`,
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
				}
			})
	},
	// @ts-ignore
	async updateProduct(data){
		const accessToken = getAccessToken()
		return axios.patch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_UPDATE_AND_DELETE_PRODUCT_URL}/${data.id}`,
				data.formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': `Bearer ${accessToken}`,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
					}
				})
	},
	async deleteProduct(id:number){
		return instance<string>({
				url: `${process.env.NEXT_PUBLIC_UPDATE_AND_DELETE_PRODUCT_URL}/${id}`,
				method: 'DELETE',
			})
	},
	async getTopProducts(id:number){
		return axios.get<IProduct[]>(
			`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}/r/${id}`,
		)
	},
	async getHistoryProducts(id:number){
		return axios.get<IProduct[]>(
			`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}/h/${id}`,
		)
	},
}