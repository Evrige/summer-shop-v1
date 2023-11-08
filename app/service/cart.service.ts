import instance from "@/app/api/api.interseptor";
import {ICartAdd, IProductResponse} from "@/app/types/product.interface";

export const CartService = {
	async getCartProducts(){
		return instance<IProductResponse[]>({
			url: `${process.env.NEXT_PUBLIC_CART}`,
			method: 'GET',
		})
	},
	async addToCart(data:ICartAdd){
		return instance<IProductResponse[]>({
			url: `${process.env.NEXT_PUBLIC_CART}`,
			data,
			method: 'POST',
		})
	},
	async deleteFromCart(id: number){
		return instance<string>({
			url: `${process.env.NEXT_PUBLIC_CART}/${id}`,
			method: 'DELETE',
		})
	},
	async sendPayment(){
		return instance<string>({
			url: `${process.env.NEXT_PUBLIC_CART_PAYMENT}`,
			method: 'POST',
		})
	},
}