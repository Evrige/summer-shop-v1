import React from 'react';
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import ProductCount from "@/app/components/UI/ProductCount";
import {IProductCartItem} from "@/app/types/product.interface";

interface IProps {
	product: IProductCartItem,
	handleCountChange: (id: number, count: number) => void
}
const CartProductsList = ({product, handleCountChange}: IProps) => {
	return (
		<div key={product.id} className="flex m-1">
			<Image src={product.photo}
						 className="rounded-[7px] mr-2"
						 alt={product.name}
						 priority
						 width={100}
						 height={100}/>
			<div className="flex justify-between items-center w-full">
				<div className="flex flex-col flex-2 justify-center">
					<span className="text-2xl mt-1">{product.name}</span>
					<span className="mt-1">Size: <span className="font-medium">{product.size}</span></span>
				</div>
				<span className="mt-1 flex-1 text-xl font-medium">{toPrice(product.price)}</span>
				<div className="flex mt-1 flex-1 items-center">
					<span className="mr-1">Кількість:</span>
					<ProductCount count={product.count} changeCount={(count) => handleCountChange(product.id, count)}/>
				</div>
			</div>

		</div>
	);
};

export default CartProductsList;