import instance from "@/app/api/api.interseptor";
import {IBrand, IProduct, IProductResponse, ISize, TypeFormData} from "@/app/types/product.interface";

export const ProductService = {
	async getProducts(id = "" as number | string){
		try {
			const response = await instance<IProductResponse[]>({
				url: `${process.env.NEXT_PUBLIC_GET_ALL_PRODUCT_AND_DETAIL_URL}/${id}`,
				method: 'GET',
			})
			console.log(response)
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
	async getBrands(){
		try {
			const response = await instance<IBrand[]>({
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
			const response = await instance<IBrand[]>({
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
	async createProduct(formData: TypeFormData){
		try {
			const response = await instance<IProductResponse[]>({
				url: process.env.NEXT_PUBLIC_CREATE_PRODUCT_URL,
				method: 'POST',
				data: formData
			})
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
	async updateAndDeleteProduct(id: number, method: "PATCH" | "DELETE", formData?: TypeFormData){
		try {
			const response = await instance<IProductResponse[]>({
				url: `${process.env.NEXT_PUBLIC_UPDATE_AND_DELETE_PRODUCT_URL}/${id}`,
				method,
				data: formData
			})
			return response.data
		} catch (e:any) {
			return e.response.data
		}
	},
}