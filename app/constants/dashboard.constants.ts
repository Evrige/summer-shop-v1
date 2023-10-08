import {EnumGender} from "@/app/types/product.interface";

export const dashboardList = [
	{
			title: "Головна",
			link: "/dashboard"
	},
	{
		title: "Товари",
		link: "/dashboard/products"
	},
	{
		title: "Закази",
		link: "/dashboard/orders"
	},
]
export const tableProductHead = ["Id", "Назва", "Фото", "Бренд", "Ціна", "Дія"]
export const enum EnumModalTitle {
	Create = "Створити",
	Edit = "Редагувати"
}
export const resetModalData = {
	id: 0,
	name: "",
	photo: "/images/noImage.png",
	description: "",
	price: 0,
	brand: {
		id: -1,
		name: ""
	},
	category: {
		id: -1,
		name: ""
	},
	gender: "MAN",
	size: []
}
export const productLegend = [
	{
		title: "ID"
	},
	{
		title: "Назва"
	},
	{
		title: "Фото"
	},
	{
		title: "Бренд"
	},
	{
		title: "Ціна"
	},
]

export const rowsDetails = {
		id: 1,
		name: 'Nike shirt',
		photo: '/images/Logo.png',
		description: "New top shirt",
		price: 3232,
		brand: {
			id: 1,
			name: "Nike"
		},
		category: {
			id: 1,
			name: "Panama"
		},
		gender: EnumGender.man,
		size: [
			{
				id: 1,
				name: "S",
				count: 134
			},
			{
				id: 2,
				name: "XS",
				count: 72
			},
			{
				id: 3,
				name: "M",
				count: 0
			}
		]
	}

export const rows = [
	{ id: 1, name: 'Nike shirt', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 2, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 3, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 4, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 5, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 6, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 7, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 8, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 9, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 10, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 11, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 12, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 13, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 14, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 15, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
	{ id: 16, name: 'Snow', photo: '/images/Logo.png', brand: "Nike", price: 3232 },
];
