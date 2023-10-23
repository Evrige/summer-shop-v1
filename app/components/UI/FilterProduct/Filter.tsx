import React, {useState} from 'react';
import {EnumGender, IProductProperty} from "@/app/types/product.interface";
import {findId} from "@/app/utils/findId";
import {useCategory} from "@/app/hooks/productHooks/useCategory";
import FilterItem from "@/app/components/UI/FilterProduct/FilterItem";
import {useBrands} from "@/app/hooks/productHooks/useBrands";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {getGenderTitle} from "@/app/utils/getGenderTitle";
import GenderFilter from "@/app/components/UI/FilterProduct/GenderFilter";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import PriceFilter from "@/app/components/UI/FilterProduct/PriceFilter";

const Filter = () => {
	const products = useAllProducts()
	const categoryList = useCategory()
	const brandsList = useBrands()
	const sizeList = useSizes()

	const prices = products?.data?.map(product => product.price) || []
	const minPrice = Math.min(...prices)
	const maxPrice = Math.max(...prices)

	const [categoryActive, setCategoryActive] = useState<IProductProperty[]>([])
	const [brandsActive, setBrandsActive] = useState<IProductProperty[]>([])
	const [sizeActive, setSizeActive] = useState<IProductProperty[]>([])
	const [genderActive, setGenderActive] = useState<string[]>([])
	const [inputRange, setInputRange] = useState({
		minValue: minPrice,
		maxValue: maxPrice
	})

	if (products.isLoading || !products.data || categoryList.isLoading) return "load"
	const handleToggleCheckBox = (element:IProductProperty, elementsList: IProductProperty[], setActive: React.Dispatch<React.SetStateAction<IProductProperty[]>>) =>{
		const currentId = findId(element.name, elementsList)?.id || -1
		currentId === -1 ?
			setActive(prevState => [...prevState, element])
			: setActive(prevState => prevState.filter(item => item.id !== currentId))
	}
	const handleToggleGender = (gender: EnumGender) => {
		const genderName = getGenderTitle(gender)
		genderActive?.indexOf(genderName) === -1 ? setGenderActive(prevState => [...prevState, genderName])
			: setGenderActive(prevState => prevState.filter(item => item !== genderName))
	}

	return (
		<div>
			<PriceFilter minPrice={minPrice} maxPrice={maxPrice} inputRange={inputRange} setInputRange={setInputRange}/>
			<FilterItem title={"Категорія"} list={categoryList.data || []} setList={(item)=> handleToggleCheckBox(item, categoryActive, setCategoryActive)}/>
			<FilterItem title={"Бренд"} list={brandsList.data || []} setList={(item)=> handleToggleCheckBox(item, brandsActive, setBrandsActive)}/>
			<FilterItem title={"Розміри"} list={sizeList.data || []} setList={(item)=> handleToggleCheckBox(item, sizeActive, setSizeActive)}/>
			<GenderFilter title={"Стать"} setList={(gender)=> handleToggleGender(gender)}/>
		</div>
	);
};

export default Filter;