import {useEffect, useState} from "react";
import {IPriceState} from "@/app/types/main.interface";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";

export const useMinMaxPrice = () => {
	const products = useAllProducts()
	const [price, setPrice] = useState<IPriceState>({
		minPrice: 0,
		maxPrice: 0
	});

	useEffect(() => {
		if (!products.isLoading && products.data) {
			const prices = products.data.map(product => product.price);
			const newMinPrice = Math.min(...prices);
			const newMaxPrice = Math.max(...prices);
			setPrice({
				minPrice: newMinPrice,
				maxPrice: newMaxPrice
			});
		}
	}, [products.isLoading, products.data]);

	return price
}