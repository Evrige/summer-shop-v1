"use client"
import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import {EnumModalTitle, rowsDetails, tableProductHead} from "@/app/constants/dashboard.constants";
import {useActions} from "@/app/hooks/useActions";
import {useProducts} from "@/app/hooks/useProducts";
import {BiEdit} from "react-icons/bi";
import {MdOutlineDeleteOutline} from "react-icons/md";
import Image from "next/image";
import ModalsCreateEditProduct from "@/app/components/modals/ModalsCreateEditProduct";
const Products: NextPage = () => {
	const actions = useActions()
	const productsState = useProducts()
	const [visible, setVisible] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	useEffect(() => {
		if (productsState.products.length === 0) {
			actions.getProducts();
		}
	}, [productsState.products, actions]);
	return (
		<div className="container">
			<button onClick={()=>{
				setModalTitle(EnumModalTitle.Create)
				setVisible((prevState) => !prevState)
			}}>Створити</button>
			<table className="m-10 w-[90%] mx-auto">
				<thead>
					<tr>
						{tableProductHead.map(item =>
							<th key={item} className="w-[50px] text-center">
								{item}
							</th>)}
					</tr>
				</thead>
				<tbody>
						{productsState.products.map(product =>
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td><Image src={product.photo} alt="Product_image" priority width={300} height={300}/></td>
								<td>{product.brand}</td>
								<td>{product.price}</td>
								<td className="flex"><BiEdit name="Редагувати" className="text-xl mr-3 text-blue-500" onClick={()=>{
									// @ts-ignore
									actions.getProductDetail(product.id)
									setModalTitle(EnumModalTitle.Edit)
									setVisible((prevState) => !prevState)
								}}/>
									<MdOutlineDeleteOutline name="Видалити" className="text-xl text-primary" onClick={()=>{
										// @ts-ignore
										actions.deleteProduct(product.id)
									}}/></td>
							</tr>
						)}
				</tbody>
			</table>
			{visible &&<ModalsCreateEditProduct title={modalTitle} handleClose={()=> setVisible(!visible)}/>}
		</div>
	);
};

export default Products;