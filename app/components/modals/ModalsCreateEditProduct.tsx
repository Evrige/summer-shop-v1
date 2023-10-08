import React, {useEffect, useState} from 'react';
import {
	IFindId,
	ISize,
} from "@/app/types/product.interface";
import Select from "@/app/components/UI/Select";
import Input from "@/app/components/UI/Input";
import SizeList from "@/app/components/SizeList";
import SelectFile from "@/app/components/UI/SelectFile";
import {RxCross1} from "react-icons/rx";
import {genders} from "@/app/constants/product.constants";
import {ProductService} from "@/app/service/product.service";
import {useActions} from "@/app/hooks/useActions";
import {useProducts} from "@/app/hooks/useProducts";
import {EnumModalTitle, resetModalData} from "@/app/constants/dashboard.constants";
interface IProps {
	title: string
	handleClose: () => void
}
const ModalsCreateEditProduct = ({title, handleClose}: IProps) => {
	const actions = useActions()
	const productsState = useProducts()
	const findId = (name:string, data:IFindId[]) => data && data.find(item => item.name === name)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	const [productData, setProductData] = useState({
		id: productsState.productDetail?.id,
		name: productsState.productDetail?.name || " ",
		photo: productsState.productDetail?.photo || "/images/noImage.png",
		description: productsState.productDetail?.description || " ",
		price: productsState.productDetail?.price || 0,
		brand: {
			id: productsState.productDetail?.brand.id || -1,
			name: productsState.productDetail?.brand.name || ""
		},
		category: {
			id: productsState.productDetail?.category.id || -1,
			name: productsState.productDetail?.category.name || ""
		},
		gender: productsState.productDetail?.gender || "MAN",
		size: productsState.productDetail?.size || []
	})
	useEffect(() => {
		actions.getSizes()
		actions.getBrands()
		actions.getCategory()
		if(productsState.productDetail !== null) { // @ts-ignore
			setProductData(productsState.productDetail);
		}
		if (EnumModalTitle.Create === title) setProductData(resetModalData);
	}, [productsState.productDetail]);
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			setSelectedFile(file);

			if (file) setProductData({...productData, photo: URL.createObjectURL(file)});
		}
	};
	const changeSizeCount = (size: ISize, newCount: number) => {
		if (newCount >= 0){
			const newSizeCount = productData.size.map((item) => {
				if (item.name === size.name) {
					return { ...item, count: newCount };
				}
				return item;
			});

			if (!newSizeCount.find((item) => item.name === size.name)) {
				newSizeCount.push({ id: size.id, name: size.name, count: 1 });
			}
			setProductData({...productData, size: newSizeCount})
		}
	}
	const handleSend = async () =>{
		const formData = new FormData()
		formData.append("file", selectedFile as File || new File([], 'empty.txt', { type: 'text/plain' }))
		const jsonData = {...productData}
		// @ts-ignore
		delete jsonData.photo;
		console.log(jsonData)
		formData.append("json", JSON.stringify(jsonData))
		if (title === EnumModalTitle.Create) await ProductService.createProduct(formData)
		else await ProductService.updateProduct({formData, id: productData.id})
		handleClose()
	}
	return (
		<div className="fixed inset-0 bg-bgColor bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
				 onClick={()=> handleClose()}>
			<div className="relative bg-bgColor p-2.5 rounded-xl" onClick={(event)=> {
				event.stopPropagation()}}>
				<div className="w-[90%] mx-auto">
					<h2 className="text-center mb-6">{title}</h2>
					<div className="max-w-[550px] flex flex-wrap">
						<div className="w-full">
							<Input className="w-2/3 mb-6 mr-2"
										 title="Назва"
										 value={productData.name}
										 setValue={(newValue) => setProductData({ ...productData, name: newValue })}/>
							<Input className="w-2/3 mb-6 mr-2"
										 title="Опис"
										 value={productData.description}
										 setValue={(newValue) => setProductData({ ...productData, description: newValue })}/>
							<Input className="w-[150px] mb-6 mr-2"
										 title="Ціна"
										 type="number"
										 value={productData.price}
										 setValue={(newValue) => setProductData({ ...productData, price: +newValue })}/>
						</div>
						<SelectFile handleFileChange={handleFileChange} image={productData.photo}/>
						<div className="max-w-[550px] flex flex-wrap">
							<Select className="mb-5 mr-6" isAddOther={true} title="Бренд"
											options={productsState.brands.map(item => item.name)}
											selectOption={productData.brand.name}
											setOptions={(newValue) => setProductData({ ...productData, brand: {id: findId(newValue, productsState.brands)?.id || -1, name: newValue}})}/>
							<Select className="mb-5 mr-6" isAddOther={true}
											title="Категорія"
											options={productsState.category.map(item => item.name)}
											selectOption={productData.category.name}
											setOptions={(newValue) => setProductData({ ...productData, category: {id: findId(newValue, productsState.category)?.id || -1, name: newValue} })}/>
							<Select className="mb-5 mr-6"
											title="Стать"
											options={genders}
											selectOption={productData.gender}
											setOptions={(newValue) => setProductData({ ...productData, gender: newValue })}/>
						</div>
						<SizeList
							sizes={productsState.sizes}
							sizesCount={productData.size}
							changeSizeCount={changeSizeCount}
						/>
					</div>
					<div className="flex justify-center my-1 mt-5">
						<button className="w-1/3 text-[18px] rounded-xl bg-primary py-2"
										onClick={handleSend}>Ok</button>
					</div>
					<RxCross1 className="absolute right-2 top-2 cursor-pointer" onClick={()=> handleClose()}/>
				</div>
			</div>
		</div>
	);
};

export default ModalsCreateEditProduct;