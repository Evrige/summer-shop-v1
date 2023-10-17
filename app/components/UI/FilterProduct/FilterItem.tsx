import React from 'react';
import {IProductProperty} from "@/app/types/product.interface";

interface IProps {
	title: string
	list: IProductProperty[]
	setList: (e: any) => void
}
const FilterItem = ({title, list, setList}:IProps) => {
	return (
		<div className="flex flex-col">
			<h2 className="text-secondary mt-2">{title}</h2>
			{!list ? "" : list.map(item => <label key={item.id} className="mt-1">
				<input type="checkbox" className="mr-1" onClick={()=> setList(item)}/>
				{item.name}
			</label>)}
		</div>
	);
};

export default FilterItem;