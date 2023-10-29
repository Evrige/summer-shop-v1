import React, {useState} from 'react';
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import {LuShoppingCart} from "react-icons/lu";
import Pagination from "@/app/components/UI/Pagination";
import {useRouter} from "next/navigation";
import Loading from "@/app/(routes)/Loading";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import {useFilter} from "@/app/hooks/useFilter";
import {EnumSortTitle} from "@/app/types/main.interface";

const UserProductsList = () => {
	const products = useAllProducts();
	const router = useRouter();
	const perPage = 24;
	const [firstIndex, setFirstIndex] = useState(0);
	const filterList = useFilter()
	if (products.isLoading || !products.data) return <Loading/>
	const sortedList = products.data.filter(product => product.name.toLowerCase().includes(filterList.search.toLowerCase()))
	filterList.sort === EnumSortTitle.new && sortedList.reverse()

	const productsList = sortedList.slice(firstIndex, firstIndex + perPage)
	return (
		<div className="w-full">
			{!productsList?.length ? <div className="text-center">Нічого не знайдено</div>
					:
					<div>
						<div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-4 gap-3">
							{productsList?.map((product) => (
								<div key={product.id} className="p-2 shadow rounded-xl cursor-pointer flex flex-col"
										 onClick={()=> router.push(`/${product.name.replace(" ", "-")}/${product.id}`)}>
									<div className="flex-grow flex items-center">
										<Image src={product.photo} alt={"Product_Image"} width={300} height={300} priority/>
									</div>
									<div className="flex flex-col justify-end">
										<p className="text-[18px] mt-1 overflow-hidden h-10 line-clamp-2">{product.name}</p>
										<p className="text-xs text-textSecondary overflow-hidden h-4">{product.brand}</p>
										<div className="flex justify-between items-center mt-1">
											<span className="text-xl overflow-hidden h-6">{toPrice(product.price)}</span>
											<LuShoppingCart className="text-secondary text-xl"/>
										</div>
									</div>
								</div>
							))}
						</div>
						<Pagination listLength={products.data.length} perPage={perPage} setFirstIndex={setFirstIndex}/>
					</div>}
		</div>
	);
};

export default UserProductsList;