import {useQuery} from "@tanstack/react-query";
import {ProductService} from "@/app/service/product.service";

export const useUserHistory = (id:number) => {
	const {isLoading, data} = useQuery(
		["getHistoryProducts"],
		() => ProductService.getHistoryProducts(id),
		{
			select: ({data})=> data
		}
	)
	return {isLoading, data}
}