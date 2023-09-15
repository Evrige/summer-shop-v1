import React from 'react';
import style from "@/app/components/UI/searchInput/searchInput.module.scss";
import {FaMagnifyingGlass} from "react-icons/fa6";

const SearchInput = () => {
	return (
		<div className="flex bg-bgColor max-w-[400px] rounded-full h-8 px-5 items-center justify-center">
			<input placeholder="Запит..." className="bg-transparent border-none h-full text-[1rem] w-full  focus:outline-none"/>
			<FaMagnifyingGlass className="text-secondary"/>
		</div>
	);
};

export default SearchInput;