import {createSlice} from "@reduxjs/toolkit";
import {IParams} from "@/app/types/main.interface";
const initialParamsList: IParams = {
	category: [],
	brands: [],
	size: [],
	gender: "",
	price: { minValue: 0, maxValue: 0 },
};
export const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		paramsList: initialParamsList,
	},
	reducers: {
		updateFilter: (state, action) => {
			const { key, item } = action.payload;
			const filterList = state.paramsList[key];

			if (filterList.some((filterItem) => filterItem.id === item.id)) {
				state.paramsList[key] = filterList.filter((filterItem) => filterItem.id !== item.id);
			} else {
				state.paramsList[key] = [...filterList, item];
			}
		},
	},
})