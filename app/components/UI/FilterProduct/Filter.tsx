import React, {useCallback, useEffect, useState} from 'react';
import {IProductProperty} from "@/app/types/product.interface";
import {findId} from "@/app/utils/findId";
import {useCategory} from "@/app/hooks/productHooks/useCategory";
import FilterItem from "@/app/components/UI/FilterProduct/FilterItem";
import {useBrands} from "@/app/hooks/productHooks/useBrands";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {getGenderTitle} from "@/app/utils/getGenderTitle";
import GenderFilter from "@/app/components/UI/FilterProduct/GenderFilter";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import PriceFilter from "@/app/components/UI/FilterProduct/PriceFilter";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {getParamsTitle} from "@/app/utils/getParamsTitle";
import {EnumParams} from "@/app/types/main.interface";

const Filter = () => {
	const pathname = usePathname()
	const router = useRouter()
	const products = useAllProducts()
	const categoryList = useCategory()
	const brandsList = useBrands()
	const sizeList = useSizes()
	const searchParams = useSearchParams()
	const prices = products?.data?.map(product => product.price) || []
	const minPrice = Math.min(...prices)
	const maxPrice = Math.max(...prices)
	const [paramsList, setParamsList] = useState({
		category: [],
		brands: [],
		size: [],
		gender: "",
		price: {
			minValue: minPrice,
			maxValue: maxPrice,
		}
	})
	const setParams = useCallback(
		(params: any) => {
			const paramsString = new URLSearchParams();

			if (params.category.length > 0) {
				const categoryValues = params.category.map((category) => category.name).join(",");
				paramsString.set(getParamsTitle(EnumParams.category), categoryValues);
			}

			if (params.brands.length > 0) {
				const brandValues = params.brands.map((brand) => brand.name).join(",");
				paramsString.set(getParamsTitle(EnumParams.brands), brandValues);
			}

			if (params.size.length > 0) {
				const sizeValues = params.size.map((size) => size.name).join(",");
				paramsString.set(getParamsTitle(EnumParams.size), sizeValues);
			}

			if (params.gender) {
				paramsString.set(getParamsTitle(EnumParams.gender), params.gender);
			}

			const priceValues = `${params.price.minValue}-${params.price.maxValue}`;
			paramsString.set(getParamsTitle(EnumParams.price), priceValues);

			return paramsString.toString().replace(/%2C/g, ",");
		},
		[searchParams]
	);


	const handleSearch = (params: any) => {
		router.push(pathname + '?' + setParams(params))
	}
	useEffect(() => {
		handleSearch(paramsList)
	}, [paramsList]);
	const handleToggleCheckBox = (element:IProductProperty, elementsList: string) =>{
		// @ts-ignore
		const currentId = findId(element.name, paramsList[elementsList])?.id || -1

		if(currentId === -1){
			setParamsList(prevState => ({
				...prevState,
				// @ts-ignore
				[elementsList]: [...paramsList[elementsList], element]
			}))
		} else {
			setParamsList(prevState => ({
				...prevState,
				// @ts-ignore
				[elementsList]: [...paramsList[elementsList].filter(item => item.id !== currentId)]
			}));
		}
	}
	if (products.isLoading || !products.data || categoryList.isLoading) return "load"
	return (
		<div>
			<PriceFilter minPrice={minPrice} maxPrice={maxPrice}
									 price={{minValue: paramsList.price.minValue, maxValue: paramsList.price.maxValue}}
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