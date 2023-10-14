import {useQuery} from "@tanstack/react-query";
import {ProductService} from "@/app/service/product.service";

export const useProductDetail = (id:number) => {
	const {isLoading, data} = useQuery(
		["ProductDetail"],
		() => ProductService.getProductDetail(id),
		{
			select: ({data})=> data
		}
	)
	return {isLoading, data}
}