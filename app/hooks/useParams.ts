import {useCallback, useEffect, useState} from "react";
import {getParamsTitle} from "@/app/utils/getParamsTitle";
import {EnumParams, EnumSortTitle, IParams} from "@/app/types/main.interface";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useFilter} from "@/app/hooks/useFilter";
import {useMinMaxPrice} from "@/app/hooks/useMinMaxPrice";

export const useParams = () => {
	const pathname = usePathname()
	const router = useRouter()
	const filter = useFilter()
	const price = useMinMaxPrice()

	useEffect(() => {
		if (price.maxValue !== -1 && price.minValue !== -1)
			router.push(pathname + '?' + setParams(filter))
	}, [filter, price.maxValue, price.minValue]);

	const setParams =
		(params: IParams) => {
			const paramsString = new URLSearchParams();

			const keys = Object.keys(params);

			keys.forEach((key) => {
				const value = params[key];
				if (Array.isArray(value) && value.length > 0) {
					const string = value.map((item) => item.name).join(",");
					const paramKey = EnumParams[key as keyof typeof EnumParams];
					paramsString.set(getParamsTitle(paramKey), string);
				}
			});
			if(params.sort !== EnumSortTitle.new) paramsString.set(getParamsTitle(EnumParams.sort), params.sort);
			if (params.gender) {
				paramsString.set(getParamsTitle(EnumParams.gender), params.gender);
			}
			if ((params.price.minValue !== price.minValue || params.price.maxValue !== price.maxValue) && params.price.minValue !== params.price.maxValue) {
				paramsString.set(getParamsTitle(EnumParams.price), `${params.price.minValue}-${params.price.maxValue}`);
			}

			return paramsString.toString().replace(/%2C/g, ",");
		}
}
