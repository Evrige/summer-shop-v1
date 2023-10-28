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
	}
}

export interface IPriceState {
	minPrice: number;
	maxPrice: number;
}
