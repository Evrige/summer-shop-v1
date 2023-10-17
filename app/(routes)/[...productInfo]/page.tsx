"use client"
import React, {Suspense, useState} from 'react';
import {useProductDetail} from "@/app/hooks/productHooks/useProductDetail";
import Image from "next/image";
import {toPrice} from "@/app/utils/toPrice";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {findId} from "@/app/utils/findId";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {getGenderTitle} from "@/app/utils/getGenderTitle";
import {EnumGender} from "@/app/types/product.interface";
import {useAuth} from "@/app/hooks/useAuth";

const Page = ({params}: {params: {productInfo: [string, string]}}) => {
	const userId = useAuth()?.user?.id || -1
	const productDetail = useProductDetail(+params.productInfo[1], +userId)
	const sizes = useSizes()
	const [selectSize, setSelectSize] = useState("")
	const [selectCount, setSelectCount] = useState(1)
	if (productDetail.isLoading || !productDetail?.data) return "Loading"
	const product = productDetail.data
	return (
			<div className="container p-5 flex">
				<Image src={product.photo || ""} className="rounded-[7px] shadow" alt={product.name} width={600} height={600}/>
				<div className="p-5 max-w-full">
					<div className="text-textSecondary">
						<span>{getGenderTitle(product.gender as EnumGender)}</span>
						<span> / </span>
						<span>{product.category.name}</span>
					</div>
					<div>
						<span className="text-3xl">{product.name}</span>
						<p className="text-2xl text-textSecondary mt-1">{product.brand.name}</p>
						<p className="text-3xl mt-1">{toPrice(product.price)}</p>
					</div>
					<div className="mt-5 h-20">
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
						<input className="focus:outline-none w-[30px] text-center" value={selectCount} onChange={(e) => setSelectCount(+e.target.value)}/>
						<MdKeyboardArrowRight className="cursor-pointer" onClick={()=> setSelectCount(prevState => prevState + 1)}/>
						<button className="w-[200px] text-[18px] rounded-[7px] bg-primary ml-4 py-1">
							Замовити
						</button>
					</div>
					<div className="mt-3 max-h-[200px] max-w-[550px] overflow-hidden">
						<p className="text-xl">Детальна інформація:</p>
						<p className=" text-[18px] leading-6">{product.description}</p>
					</div>
				</div>
			</div>
	);
};

export default Page;