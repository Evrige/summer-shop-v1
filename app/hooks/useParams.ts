import {useCallback, useEffect, useState} from "react";
import {getParamsTitle} from "@/app/utils/getParamsTitle";
import {EnumParams, IParams} from "@/app/types/main.interface";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const useParams = (minPrice:number, maxPrice:number) => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const [paramsList, setParamsList] = useState<IParams>({
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

			if (params.gender) {
				paramsString.set(getParamsTitle(EnumParams.gender), params.gender);
			}

			if (params.price.minValue !== minPrice || params.price.maxValue !== maxPrice) {
				paramsString.set(getParamsTitle(EnumParams.price), `${params.price.minValue}-${params.price.maxValue}`);
			}

			return paramsString.toString().replace(/%2C/g, ",");
		},
		[searchParams]
	);

	useEffect(() => {
		router.push(pathname + '?' + setParams(paramsList))
	}, [paramsList]);

	return {
		paramsList,
		setParamsList
	}
}
