import {useQuery} from "@tanstack/react-query";
import {ProductService} from "@/app/service/product.service";

export const useSizes = () => {
	const {isLoading, data} = useQuery(
		["getSizes"],
		() => ProductService.getSizes(),
		{
			select: ({data})=> data
		}
	)
	return {isLoading, data}
}