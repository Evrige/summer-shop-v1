import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ProductService} from "@/app/service/product.service";
import {errorNotify} from "@/app/utils/notification/errorNotify";
import {successNotify} from "@/app/utils/notification/successNotify";

export const useAllProducts = (params: string = "") => {
	const { isLoading, data, refetch } = useQuery(
		['AllProducts', params],
		() => ProductService.getProducts(params),
		{
			select: ({ data }) => data,
			staleTime: 10000,
		}
	);

	return { isLoading, data, refetch };
};
export const useAllProductsMutation = () => {
	const queryClient = useQueryClient();

	const allProductsMutation = useMutation(
		(params) => ProductService.getProducts(params),
		{
			onMutate: (params) => {
				const previousData = queryClient.getQueryData(['AllProducts']);
				return { params, previousData };
			},
			onSettled: (result, error, context) => {
				if (result) {
					// Update the cache with the mutation result
					queryClient.setQueryData(['AllProducts', context.params], result);
				} else {
					// In case of an error, revert to the previous data in the cache
					queryClient.setQueryData(['AllProducts', context.params], context.previousData);
				}
				// Invalidate the 'AllProducts' query to trigger a re-fetch
				queryClient.invalidateQueries(['AllProducts', context.params]);
			},
		}
	);

	return allProductsMutation;
};

export const useDeleteProduct = () => {
	const products = useAllProducts()
	const {isLoading, mutate} = useMutation(
		["deleteProduct"],
		(id:number) => ProductService.deleteProduct(id),
		{
			async onSuccess() {
				await products.refetch()
				successNotify("Продукт видалено")
			},
			onError(error: { response: { data: { message: string } } }) {
				errorNotify(error.response.data.message)
			},
		}
	)
	return {isLoading, mutate}
}

export const useCreateProduct = () => {
	const products = useAllProducts()
	const {isLoading, mutate, error, isError} = useMutation(
		["createProduct"],
		(formData:FormData) =>  ProductService.createProduct(formData),
		{
			async onSuccess() {
				await products.refetch()
				successNotify("Продукт створено")
			},
			onError(error: { response: { data: { message: string } } }) {
				errorNotify(error.response.data.message)

			},
		}
	)
	return {isLoading, mutate, isError, error }
}

export const useEditProduct = () => {
	const products = useAllProducts()
	const {isLoading, mutate} = useMutation(
		["updateProduct"],
		(data) => ProductService.updateProduct(data),
		{
			async onSuccess() {
				await products.refetch()
				successNotify("Продукт оновлено")
			},
			onError(error: { response: { data: { message: string } } }) {
				errorNotify(error.response.data.message)
			},
		}
	)
	return {isLoading, mutate}
}