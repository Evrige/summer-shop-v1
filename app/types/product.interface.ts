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

export interface IBrandCategory {
	id: number,
	name: string,
}

export interface IFindId {
	id: number,
	name: string
	count?: number
}

export interface ICombinedData {
	sizes: ISize[];
	brands: IBrandCategory[];
	category: IBrandCategory[];
	products: IProductResponse[];
}

export interface IInitialProducts {
		products: IProductResponse[],
		brands: IBrandCategory[],
		category: IBrandCategory[],
		sizes: ISize[],
		productDetail: IProduct | null,
		isLoading: boolean
}

export interface IAllProducts {
	isLoading: boolean,
	data: IProductResponse[]
}