import React, {useEffect, useState} from 'react';
import {RxCross1} from "react-icons/rx";
import {IProductCartItem} from "@/app/types/product.interface";
import CartProductsItem from "@/app/components/products/CartProductsItem";
import {useCart} from "@/app/hooks/useCart";
import {useActions} from "@/app/hooks/useActions";
import {toPrice} from "@/app/utils/toPrice";
import UserTopList from "@/app/components/products/HistoryTop/UserTopList";
import {useRouter} from "next/navigation";
import {errorNotify} from "@/app/utils/notification/errorNotify";
import {LuTrash} from "react-icons/lu";
import {act} from "react-dom/test-utils";
import {successNotify} from "@/app/utils/notification/successNotify";

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
	const cart = useCart()
	const actions = useActions()
	const router = useRouter()
	useEffect(() => {
		actions.getCartProducts()
	}, []);
	// const handleCountChange = (productId: number, newCount: number) => {
	// 	setProducts((prevProducts) =>
	// 		prevProducts.map((product) =>
	// 			product.id === productId ? { ...product, count: Math.max(0, newCount) } : product
	// 		)
	// 	);
	// };
	const handlePayment = () => {
			if (cart.products.length > 0){
				router.push("cart/payment")
			}

	}
	return (
		<div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-scroll"
				 onClick={()=> handleClose()}>
			<div className="flex flex-col bg-bgColor rounded-[7px] w-2/3 h-[600px] "
					 onClick={(event)=> {
				event.stopPropagation()}}>
				<div className="p-2 border border-b-secondary rounded-t-[7px] relative">
					<h2 className="text-xl font-semibold">Кошик</h2>
					<RxCross1 className="absolute right-1 top-1 cursor-pointer"
										onClick={()=> handleClose()}/>
				</div>
				<div className="flex-auto overflow-y-auto">
					{cart.products.length > 0 ?
						cart.products.map((product) => <CartProductsItem key={product.id} product={product} handleCountChange={actions.setItemCount}/>)
						: <div className="flex justify-center">Кошик порожній</div>
					}
				</div>
				<div className="flex items-center justify-end mr-[7%] my-3">
					<div className="bg-primary bg-opacity-20 p-5 rounded-[7px] border border-primary">
						<span>Загальна сума: <span className="text-xl font-medium">{toPrice(cart.total)}</span></span>
						<button className="w-[200px] text-[18px] rounded-[7px] bg-primary py-2 ml-4" onClick={handlePayment}>Замовити</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalsCart;