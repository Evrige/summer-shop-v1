import React from 'react';
import {IProductProperty} from "@/app/types/product.interface";
import {findId} from "@/app/utils/findId";
import {useCategory} from "@/app/hooks/productHooks/useCategory";
import FilterItem from "@/app/components/FilterProduct/FilterItem";
import {useBrands} from "@/app/hooks/productHooks/useBrands";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {getGenderTitle} from "@/app/utils/getGenderTitle";
import GenderFilter from "@/app/components/FilterProduct/GenderFilter";
import PriceFilter from "@/app/components/FilterProduct/PriceFilter";
import {EnumParams, IParams} from "@/app/types/main.interface";

interface IProps {
	paramsList: IParams;
	setParamsList: React.Dispatch<React.SetStateAction<IParams>>,
	minMaxPrice: {
		minPrice: number;
		maxPrice: number;
	}
}

const Filter = ({paramsList, setParamsList, minMaxPrice}: IProps) => {
	const categoryList = useCategory()
	const brandsList = useBrands()
	const sizeList = useSizes()

	const handleToggleCheckBox = (element:IProductProperty, elementsList: string) =>{
		const currentId = findId(element.name, paramsList[elementsList])?.id || -1

		if(currentId === -1){
			setParamsList(prevState => ({
				...prevState,
				[elementsList]: [...paramsList[elementsList], element]
			}))
		} else {
			setParamsList(prevState => ({
				...prevState,
				[elementsList]: [...paramsList[elementsList].filter((item:IProductProperty) => item.id !== currentId)]
			}));
		}
	}
	return (
		<div>
			<PriceFilter minMaxPrice={minMaxPrice}
									 setPrice={(price) => setParamsList(prevState => ({
										 ...prevState,
										 price: {
											 minValue: price.minValue,
											 maxValue: price.maxValue
										 }
									 }))}/>
			<FilterItem title={"Категорія"} list={categoryList.data || []} setList={(item)=> handleToggleCheckBox(item, EnumParams.category)}/>
			<FilterItem title={"Бренд"} list={brandsList.data || []} setList={(item)=> handleToggleCheckBox(item, EnumParams.brands)}/>
			<FilterItem title={"Розміри"} list={sizeList.data || []} setList={(item)=> handleToggleCheckBox(item, EnumParams.size)}/>
			<GenderFilter title={"Стать"}
										setList={(genderName)=> setParamsList(prevState => ({
											...prevState,
											gender: getGenderTitle(genderName)}))}/>
		</div>
	);
};

export default Filter;