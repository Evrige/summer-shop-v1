import {EnumParams, EnumSortServerId, EnumSortTitle, IParams} from "@/app/types/main.interface";
import {useFilter} from "@/app/hooks/useFilter";
import {useAllProducts, } from "@/app/hooks/productHooks/useAllProducts";

export const useServerParams = () => {
	const filter = useFilter()

	const setParams =
		(params: IParams) => {
			const paramsString = new URLSearchParams();

			const keys = Object.keys(params);

			keys.forEach((key) => {
				const value = params[key];
				if (Array.isArray(value) && value.length > 0) {
					const string = value.map((item) => item.id).join(",");
					const paramKey = EnumParams[key as keyof typeof EnumParams];
					paramsString.set(paramKey, string);
				}
			});
			if(params.sort !== EnumSortTitle.new)
				{ // @ts-ignore
					paramsString.set(EnumParams.sort, EnumSortServerId[params.sort]);
				}
			if (params.gender)
				paramsString.set(EnumParams.gender, params.gender);

			if ((params.price.minValue !== filter.minMaxPrice.minValue || params.price.maxValue !== filter.minMaxPrice.maxValue)
				&& params.price.minValue !== params.price.maxValue) {
				paramsString.set("min_price", `${params.price.minValue}`);
				paramsString.set("max_price", `${params.price.maxValue}`);
			}
			return paramsString.toString();
		}
		const data = (filter.minMaxPrice.maxValue !== -1 && filter.minMaxPrice.minValue !== -1) ? setParams(filter) : ""
		const products = useAllProducts(data);
		// console.log(products.data)
}
