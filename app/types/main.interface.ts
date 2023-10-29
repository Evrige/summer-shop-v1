import React, {useState} from "react";
import {IProductProperty} from "@/app/types/product.interface";

export interface IDropMenuItem {
	icon: React.ReactNode
	link: string
	title: string
}

export enum EnumParams {
	category = "category",
	brands = "brands",
	size = "size",
	gender = "gender",
	price = "price",
	sort = "sort",
	search = "search"
}

export interface IParams {
	[key: string]: any;
	category: IProductProperty[],
	brands: IProductProperty[],
	size: IProductProperty[],
	gender: string,
	price: {
		minValue: number,
		maxValue: number,
	},
	sort: string,
	search: string
}

export interface IPriceState {
	minValue: number;
	maxValue: number;
}

export enum EnumSortTitle {
	new = "Новинка",
	cheap = "Від дешевих до дорогих",
	expensive = "Від дорогих до дешевих"
}
