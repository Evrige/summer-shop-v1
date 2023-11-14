import React, {useState} from 'react';
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import ProductCount from "@/app/components/UI/ProductCount";
import {IProductCartItem} from "@/app/types/product.interface";
import {LuTrash} from "react-icons/lu";
import {useActions} from "@/app/hooks/useActions";
import Select from "@/app/components/UI/Select";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {EnumParams} from "@/app/types/main.interface";
import {dropDownFilter} from "@/app/constants/main.constants";
import {useCart} from "@/app/hooks/useCart";

interface IProps {
	product: IProductCartItem,
	handleCountChange: ({}) => void
}
const CartProductsItem = ({product, handleCountChange}: IProps) => {
	const actions = useActions()
	const cart = useCart()
	const sizes = useSizes()
	const [size, setSize] = useState(cart.products[0].size)
	return (
		<div className="flex m-1">
			<Image src={product.photo}
						 className="rounded-[7px] mr-2"
						 alt={product.name}
						 priority
						 width={100}
						 height={100}/>
			<div className="flex justify-between items-center w-full mr-5">
				<div className="flex flex-col flex-2 justify-center">
					<span className="text-2xl mt-1">{product.name}</span>
					<span className="mt-1">Розмір:
						<select className="outline-none bg-transparent font-medium text-center"
						// onChange={(event)=> actions.addToCart()}
										value={size}>
						{sizes?.data?.map(option =>
							<option key={option.id}
											value={option.name}>
								{option.name}
							</option>)}
					</select></span>
				</div>
				<span className="mt-1 flex-1 text-xl font-medium">{toPrice(product.price)}</span>
				<div className="flex mt-1 flex-1 items-center">
					<span className="mr-1">Кількість:</span>
					<ProductCount count={product.count} changeCount={(count) => handleCountChange({id:product.id, count})}/>
				</div>
				<LuTrash onClick={()=> actions.deleteFromCart(product.id)} className="text-primary text-xl cursor-pointer"/>
			</div>

		</div>
	);
};

export default CartProductsItem;