import React from 'react';
import {genders} from "@/app/constants/product.constants";
import {getGenderTitle} from "@/app/utils/getGenderTitle";

interface IProps {
	title: string
	setList: (e: any) => void
}
const GenderFilter = ({title, setList}:IProps) => {
	return (
		<div className="flex flex-col">
			<h2 className="text-secondary mt-2">{title}</h2>
			{genders.map(gender => <label key={gender} className="mt-1">
				<input type="checkbox" className="mr-1" onClick={()=> setList(gender)}/>
				{getGenderTitle(gender)}
			</label>)}
		</div>
	);
};

export default GenderFilter;