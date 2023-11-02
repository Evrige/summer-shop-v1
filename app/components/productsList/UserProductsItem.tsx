import React from 'react';
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import {LuShoppingCart} from "react-icons/lu";
import {IProductResponse} from "@/app/types/product.interface";
import {useRouter} from "next/navigation";

interface IProps {
	product: IProductResponse
}
const UserProductsItem = ({product}:IProps) => {
	const router = useRouter()
	return (
		<div className="p-2 shadow rounded-xl cursor-pointer flex flex-col"
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
	);
};

export default UserProductsItem;