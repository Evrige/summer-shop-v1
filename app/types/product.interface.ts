export type TypeFormData = {
	file: File | null,
	json: IProduct
}

export interface IProduct {
	id: number,
	name: string,
	photo?: string,
	description: string,
	price: number,
	brand: {
		id: number,
		name: string
	},
	category: {
		id: number,
		name: string
	},
	gender: string,
	size: ISize[]
}
export interface IProductResponse {
	id: number,
	name: string,
	photo: string,
	brand: string,
	price: number
}
export enum EnumGender {
	man = "MAN",
	woman = "WOMAN",
	child = "CHILD",
}
export interface ISize {
	id: number,
	name: string,
	count?: number
}

export interface IBrand {
	id: number,
	name: string,
}

export interface IFindId {
	id: number,
	name: string
}