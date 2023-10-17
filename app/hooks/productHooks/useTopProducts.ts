import {useQuery} from "@tanstack/react-query";
import {ProductService} from "@/app/service/product.service";

export const useTopProducts = (id:number) => {
	const {isLoading, data} = useQuery(
		["getTopProducts"],
		() => ProductService.getTopProducts(id),
		{
			select: ({data})=> data
		}
	)
	return {isLoading, data}
}