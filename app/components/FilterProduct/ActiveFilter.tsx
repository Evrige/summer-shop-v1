import React from 'react';
import {RxCross2} from "react-icons/rx";
import {EnumParams} from "@/app/types/main.interface";
import {getParamsTitle} from "@/app/utils/getParamsTitle";
import {dropDownFilter} from "@/app/constants/main.constants";
import {useFilter} from "@/app/hooks/useFilter";
import {useActions} from "@/app/hooks/useActions";
import {useMinMaxPrice} from "@/app/hooks/useMinMaxPrice";

const ActiveFilter = () => {
	const filterList = useFilter()
	const actions = useActions()
	const price = useMinMaxPrice()
	const keys = Object.keys(filterList);

	const hasActiveFilters = keys.some((key) => {
		const value = filterList[key];
		if (Array.isArray(value)) {
			return value.length > 0;
		} else if (key === EnumParams.gender && filterList[key]) {
			return true;
		} else if (key === EnumParams.price) {
			return filterList.price.minValue !== price.minValue || filterList.price.maxValue !== price.maxValue;
		}
		return false;
	});
	return (
		<section className="flex my-2 justify-between">
			<div className="flex overflow-x-auto w-full mr-1.5">
				 <span  onClick={()=>actions.updateFilter("clear")}
																		className="flex whitespace-nowrap border-secondary p-2 border mr-1 rounded-3xl justify-center items-center cursor-pointer">
					Скинути</span>
				{
					keys.map((key) => {
						const value = filterList[key];
						if (Array.isArray(value) && value.length > 0) {
							return value.map(item => <span key={item.id}
																						 onClick={()=>actions.updateFilter({key, item})}
																						 className="flex whitespace-nowrap border-secondary p-2 border mr-1 rounded-3xl justify-center items-center cursor-pointer">
                {item.name}
								<RxCross2 className="ml-1"/></span>)
						}
						else if (key === EnumParams.gender && filterList[key])
							return <span key={getParamsTitle(key)}
													 onClick={()=>
														 actions.updateFilter({key, item: ""})
													 }
													 className="flex whitespace-nowrap border-secondary p-2 border mr-1 rounded-3xl justify-center items-center cursor-pointer">
              {filterList[key]}<RxCross2 className="ml-1"/></span>
						if (key === EnumParams.price && (filterList.price.minValue !== price.minValue || filterList.price.maxValue !== price.maxValue) && filterList.price.minValue !== filterList.price.maxValue)
							return <span key={getParamsTitle(key)}
													 onClick={()=>{
														 actions.updateFilter({key, item: {
																 minValue: price.minValue,
																 maxValue: price.maxValue}})
													 }}
													 className="flex whitespace-nowrap border-secondary p-2 border mr-1 rounded-3xl justify-center items-center cursor-pointer">
              {`${filterList.price.minValue}-${filterList.price.maxValue}`}<RxCross2 className="ml-1"/></span>
					})
				}
			</div>
			<div>
				<select className="flex outline-none border-secondary p-2 border mr-1 rounded-[7px] justify-center items-center"
								onChange={(event)=> actions.updateFilter({key: EnumParams.sort, item: event.target.value})}>
					{dropDownFilter.map(option =>
						<option key={option.title}
										value={option.title}>
							{option.title}
						</option>)}
				</select>
			</div>
		</section>
	);
};

export default ActiveFilter;