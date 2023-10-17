import React, {useState} from 'react';
import {IProductProperty} from "@/app/types/product.interface";
import {findId} from "@/app/utils/findId";
import {useCategory} from "@/app/hooks/productHooks/useCategory";
import FilterItem from "@/app/components/UI/FilterProduct/FilterItem";
import {useBrands} from "@/app/hooks/productHooks/useBrands";
import {useSizes} from "@/app/hooks/productHooks/useSizes";

const Filter = () => {
	const categoryList = useCategory()
	const brandsList = useBrands()
	const sizeList = useSizes()
	const [categoryActive, setCategoryActive] = useState<IProductProperty[]>([])
	const [brandsActive, setBrandsActive] = useState<IProductProperty[]>([])
	const [sizeActive, setSizeActive] = useState<IProductProperty[]>([])
	if (categoryList.isLoading) return "load"
	const handleToggleCheckBox = (element:IProductProperty, elementsList: IProductProperty[], setActive: React.Dispatch<React.SetStateAction<IProductProperty[]>>) =>{
		const currentId = findId(element.name, elementsList)?.id || -1
		currentId === -1 ?
			setActive(prevState => [...prevState, element])
			: setActive(prevState => prevState.filter(item => item.id !== currentId))
	}
	return (
		<div>
			<FilterItem title={"Категорія"} list={categoryList.data || []} setList={(item)=> handleToggleCheckBox(item, categoryActive, setCategoryActive)}/>
			<FilterItem title={"Бренд"} list={brandsList.data || []} setList={(item)=> handleToggleCheckBox(item, brandsActive, setBrandsActive)}/>
			<FilterItem title={"Розміри"} list={sizeList.data || []} setList={(item)=> handleToggleCheckBox(item, sizeActive, setSizeActive)}/>
		</div>
	);
};

export default Filter;