import React from 'react';
import {EnumParams} from "@/app/types/main.interface";
import {dropDownFilter} from "@/app/constants/main.constants";
import {useActions} from "@/app/hooks/useActions";

const SortFilter = () => {
	const actions = useActions()
	return (
		<select className="flex outline-none border-secondary p-2 border mr-1 rounded-[7px] justify-center items-center"
						onChange={(event)=> actions.updateFilter({key: EnumParams.sort, item: event.target.value})}>
			{dropDownFilter.map(option =>
				<option key={option.title}
								value={option.title}>
					{option.title}
				</option>)}
		</select>
	);
};

export default SortFilter;