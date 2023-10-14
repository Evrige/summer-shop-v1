"use client"
import React, {Suspense, useState} from 'react';
import {useProductDetail} from "@/app/hooks/productHooks/useProductDetail";
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {findId} from "@/app/utils/findId";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";

const Page = ({params}: {params: {productInfo: [string, string]}}) => {
	const productDetail = useProductDetail(+params.productInfo[1])
	const sizes = useSizes()
	const [selectSize, setSelectSize] = useState("")
	const [selectCount, setSelectCount] = useState(1)
	if (productDetail.isLoading || !productDetail?.data) return "Loading"
	const product = productDetail.data
	return (
			<div className="container p-5 flex ">
				<Image src={product.photo || ""} className="rounded-[7px] shadow" alt={product.name} width={600} height={600}/>
				<div className="p-5">
					<div className="max-w-[350px] h-1/2">
						<span className="text-3xl">{product.name}</span> <span className="text-textSecondary">{product.category.name}</span>
						<p className="text-2xl text-textSecondary mt-1">{product.brand.name}</p>
						<p className="text-3xl mt-1">{toPrice(product.price)}</p>
						<p className="text-2xl mt-1">{product.description}</p>
					</div>
					<div>
						<p className="text-xl">Розміри:</p>
						<div className="flex gap-2 m-2">
							{sizes.data?.map(size =>
								<button key={size.id}
												disabled={!findId(size.name, product.size)?.count ?? 0 > 0}
												className={`
												${!findId(size.name, product.size)?.count ?? 0 > 0 ? "opacity-60 size" : ""}
												${selectSize === size.name ? "border-secondary" : "border-transparent"} 
												relative bg-bgColor py-1 px-2 box-border border`}
												onClick={()=> setSelectSize(size.name)}>
									{size.name}
								</button>
							)}
						</div>
						{selectSize && <button onClick={()=> setSelectSize("")}>Очистити</button>}
					</div>
					<div className="flex items-center text-2xl gap-3 mt-10">
						<MdKeyboardArrowLeft className="cursor-pointer" onClick={()=> setSelectCount(prevState => prevState - 1)}/>
						<input className="focus:outline-none w-[20px] text-center" value={selectCount} onChange={(e) => setSelectCount(+e.target.value)}/>
						<MdKeyboardArrowRight className="cursor-pointer" onClick={()=> setSelectCount(prevState => prevState + 1)}/>
					</div>
					<div>
						<button className="w-[200px] mt-10 text-[18px] rounded-[7px] bg-primary py-3">
							Замовити
						</button>
					</div>
				</div>
			</div>
	);
};

export default Page;