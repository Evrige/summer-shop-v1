import instance from "@/app/api/api.interseptor";
import {IBrandCategory, IProduct, IProductResponse, ISize} from "@/app/types/product.interface";
import {getAccessToken} from "@/app/service/auth/auth.helper";
import axios from "axios";
import {log} from "util";

export const ProductService = {
	async getProducts(){
		try {
			const response = await instance<IProductResponse[]>({
				url: `${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}`,
				method: 'GET',
			})
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
	async getProductDetail(id:any){
		try {
			const response = await instance<IProduct>({
				url: `${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}/${id}`,
				method: 'GET',
			})
			console.log(response.data)
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
	async getBrands(){
		try {
			const response = await instance<IBrandCategory[]>({
				url: process.env.NEXT_PUBLIC_GET_ALL_BRAND_URL,
				method: 'GET',
			})
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
	async getCategory(){
		try {
			const response = await instance<IBrandCategory[]>({
				url: process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_URL,
				method: 'GET',
			})
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
	async getSizes(){
		try {
			const response = await instance<ISize[]>({
				url: process.env.NEXT_PUBLIC_GET_ALL_SIZE_URL,
				method: 'GET',
			})

			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},

	// ADMIN REQUESTS
	async createProduct(formData: any){
		const accessToken = getAccessToken()
		try {
			const response = await axios.post(
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
			return response.data
		} catch (e:any) {
			console.log(e.response.data)
		}
	},
	// @ts-ignore
	async updateProduct({formData, id}){
		const accessToken = getAccessToken()
		try {
			const response = await axios.patch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_UPDATE_AND_DELETE_PRODUCT_URL}/${id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': `Bearer ${accessToken}`,
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
					}
				})
			return response.data
		} catch (e:any) {
			console.log(e.response.data)
		}
	},
	async deleteProduct(id:any){
		try {
			const response = await instance<string>({
				url: `${process.env.NEXT_PUBLIC_UPDATE_AND_DELETE_PRODUCT_URL}/${id}`,
				method: 'DELETE',
			})

			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
}