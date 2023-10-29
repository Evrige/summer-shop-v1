import {createSlice} from "@reduxjs/toolkit";
import {EnumParams, EnumSortTitle, IParams} from "@/app/types/main.interface";
import {IProductProperty} from "@/app/types/product.interface";

const initialState: IParams = {
	category: [],
	brands: [],
	size: [],
	gender: "",
	price: {
		minValue: 0,
		maxValue: 0
	},
	sort: EnumSortTitle.new,
	search: ""
};
export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		updateFilter: (state, action) => {
			if (action.payload === "clear") return  initialState

			const { key, item } = action.payload;

			if (!Array.isArray(state[key])) {
				state[key] = item;
			} else {
				const filterList = state[key];
				if (filterList.some((filterItem:IProductProperty) => filterItem.id === item.id)) {
					state[key] = filterList.filter((filterItem:IProductProperty) => filterItem.id !== item.id);
				} else {
					state[key] = [...filterList, item];
				}
			}
		},
	},
})