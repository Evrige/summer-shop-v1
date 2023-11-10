import React, {useState} from 'react';
import {RxCross1} from "react-icons/rx";
import UserTopList from "@/app/components/products/HistoryTop/UserTopList";
import {IProductCartItem} from "@/app/types/product.interface";
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import ProductCount from "@/app/components/UI/ProductCount";
import CartProductsList from "@/app/components/products/CartProductsList";
import {EnumModalTitle} from "@/app/constants/dashboard.constants";

interface IProps {
	handleClose: () => void
}

const ModalsCart = ({handleClose}: IProps) => {
	const [products, setProducts] = useState<IProductCartItem[]>([
		{
			id: 1,
			name: "super shirt",
			photo: "/images/noImage.png",
			brand: "Nike",
			price: 3999,
			size: "S",
			count: 1
		},
		{
			id: 2,
			name: "super111111 shirt",
			photo: "/images/noImage.png",
			brand: "Puma",
			price: 10999,
			size: "S",
			count: 1
		},
		{
			id: 3,
			name: "super22222shirt",
			photo: "/images/noImage.png",
			brand: "Nike",
			price: 9999,
			size: "M",
			count: 5
		},
		{
			id: 4,
			name: "super 3333shirt",
			photo: "/images/noImage.png",
			brand: "Nike",
			price: 999,
			size: "S",
			count: 2
		},
	])
	const handleCountChange = (productId: number, newCount: number) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === productId ? { ...product, count: Math.max(0, newCount) } : product
			)
		);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-scroll"
				 onClick={()=> handleClose()}>
			<div className="relative bg-bgColor rounded-[7px] w-2/3 h-[600px] overflow-y-auto"
					 onClick={(event)=> {
				event.stopPropagation()}}>
				<div className="p-2 border border-b-secondary rounded-t-[7px]">
					<h2 className="text-xl font-semibold">Кошик</h2>
				</div>
				{products.map((product) => <CartProductsList key={product.id} product={product} handleCountChange={handleCountChange}/>)}

				<div>
					<span>Загальна сума: </span>
					<button className="w-[200px] text-[18px] rounded-[7px] bg-primary py-2 ">Замовити</button>
				</div>
				{/*<UserTopList/>*/}
				<RxCross1 className="absolute right-1 top-1 cursor-pointer"
									onClick={()=> handleClose()}/>
			</div>
		</div>
	);
};

export default ModalsCart;