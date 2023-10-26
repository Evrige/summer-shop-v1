import React from "react";

export interface IDropMenuItem {
	icon: React.ReactNode
	link: string
	title: string
}

export const enum EnumParams {
	category = "category",
	brands = "brands",
	size = "size",
	gender = "gender",
	price = "price",
}
