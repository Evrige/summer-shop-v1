"use client"
import React, {useState} from 'react';
import {NextPage} from "next";
import {EnumModalTitle} from "@/app/constants/dashboard.constants";
import {BiEdit} from "react-icons/bi";
import {MdOutlineDeleteOutline} from "react-icons/md";
import Image from "next/image";
import ModalsCreateEditProduct from "@/app/components/modals/ModalsCreateEditProduct";
import {useAllProducts, useDeleteProduct} from "@/app/hooks/productHooks/useAllProducts";
import SearchInput from "@/app/components/UI/SearchInput";
import Pagination from "@/app/components/UI/Pagination";
import {toPrice} from "@/app/utils/toPrice";
const Products: NextPage = () => {
	const products = useAllProducts()
	const deleteProduct = useDeleteProduct()
	const [visible, setVisible] = useState(false);
	const [modalData, setModalData] = useState({title: "", id: 0});

	const perPage = 14;
	const [firstIndex, setFirstIndex] = useState(0)

	if (products.isLoading || !products.data) return "load"

	const productsList = products.data.slice(firstIndex, firstIndex + perPage)

	return (
		<div className="container">
			<div className="w-[90%] mx-auto flex justify-between items-center">
				<SearchInput/>
				<button onClick={()=>{
					setModalData({title: EnumModalTitle.Create , id: 0})
					setVisible((prevState) => !prevState)
				}} className=" w-[200px] mb-3 text-[18px] mt-2 rounded-[7px] bg-primary py-2 ">Створити</button>
			</div>
			{products.isLoading ? <div>Loading...</div> :
				!products.data?.length ? <div className="text-center">Наразі не має товарів в наявності</div>
					:
			<div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-7 md:grid-cols-6 sm:grid-cols-4 gap-3 mb-5">
				{productsList.map(product =>
					<div key={product.id} className="shadow-xl p-2 rounded-[7px] flex flex-col">
						<div className="flex-grow flex items-center">
							<Image src={product.photo} alt={"Product_Image"} width={250} height={250} priority/>
						</div>
						<div className="flex flex-col justify-end">
							<p className="text-[18px] mt-1 overflow-hidden h-10 line-clamp-2">{product.name}</p>
							<p className="text-xs text-textSecondary overflow-hidden h-4">{product.brand}</p>
							<p className="my-1 font-bold">{toPrice(product.price)}</p>
							<div className="flex justify-center">
								<div className="h-7 text-[15px] flex items-center flex-wrap overflow-hidden border p-1 rounded-[7px] mr-2 cursor-pointer justify-center 2xl:justify-start"
										 onClick={()=>{
											 setModalData({title: EnumModalTitle.Edit , id: product.id})
											 setVisible((prevState) => !prevState)
										 }}>
									<BiEdit name="Редагувати" className="text-xl mr-0.5 text-blue-500" />
									Edit
								</div>
								<div className="h-7 text-[15px] flex items-center flex-wrap overflow-hidden border p-1 rounded-[7px] mr-2 cursor-pointer justify-center 2xl:justify-start"
										 onClick={()=> deleteProduct.mutate(product.id)}>
									<MdOutlineDeleteOutline name="Видалити" className="text-xl mr-0.5 text-primary"/>
									Delete
								</div>
							</div>
						</div>
					</div>
				)}
			</div>}
			<Pagination listLength={products.data.length} perPage={perPage} setFirstIndex={setFirstIndex}/>
			{visible &&<ModalsCreateEditProduct modalData={modalData} handleClose={()=> setVisible(!visible)}/>}
		</div>
	);
};

export default Products;