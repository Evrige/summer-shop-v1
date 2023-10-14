import React, {useEffect, useState} from 'react';
import {
	IFindId, IProduct,
	ISize,
} from "@/app/types/product.interface";
import Select from "@/app/components/UI/Select";
import Input from "@/app/components/UI/Input";
import SizeList from "@/app/components/SizeList";
import SelectFile from "@/app/components/UI/SelectFile";
import {RxCross1} from "react-icons/rx";
import {genders} from "@/app/constants/product.constants";
import {EnumModalTitle} from "@/app/constants/dashboard.constants";
import {useSizes} from "@/app/hooks/productHooks/useSizes";
import {useBrands} from "@/app/hooks/productHooks/useBrands";
import {useCategory} from "@/app/hooks/productHooks/useCategory";
import {useProductDetail} from "@/app/hooks/productHooks/useProductDetail";
import {useCreateProduct, useEditProduct} from "@/app/hooks/productHooks/useAllProducts";
import {errorNotify} from "@/app/utils/notification/errorNotify";
interface IProps {
	modalData: {
		title: string
		id: number
	}
	handleClose: () => void
}
const ModalsCreateEditProduct = ({modalData, handleClose}: IProps) => {
	const sizes = useSizes()
	const brands = useBrands()
	const category = useCategory()
	const createProduct = useCreateProduct()
	const editProduct = useEditProduct()
	const findId = (name:string, data:IFindId[]) => data && data.find(item => item.name === name)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [productData, setProductData] = useState<IProduct>({
		id: 0,
		name: "",
		photo: "/images/noImage.png",
		description: "",
		price: 0,
		brand: {
			id: -1,
			name: ""
		},
		category: {
			id: -1,
			name: ""
		},
		gender: "MAN",
		size: []
	})
	function CreateProductComponent() {
		const productDetail = useProductDetail(modalData.id);
		useEffect(() => {
			if (productDetail.data) {
				setProductData(productDetail.data);
			}
		}, [productDetail.isLoading, productDetail.data]);
	}
	if (modalData.title === EnumModalTitle.Edit) CreateProductComponent()
	useEffect(() => {
		if (modalData.title === EnumModalTitle.Create){
			setProductData({
				...productData,
				brand: {
					id: brands?.data?.[0]?.id || -1,
					name: brands?.data?.[0]?.name || "",
				},
				category: {
					id: category?.data?.[0]?.id || -1,
					name: category?.data?.[0]?.name || "",
				},
			});
		}
	}, [category.data, brands.data]);
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
	const validationForm = () => {
		const validation = (!productData.name || !productData.description
			|| productData.price === 0)
		if (validation) errorNotify("Заповніть усі поля")
		return !validation;
	}
	const handleSend = () =>{
		if (!validationForm()) return
		const formData = new FormData()
		formData.append("file", selectedFile as File || new File([], 'empty.txt', { type: 'text/plain' }))
		const jsonData = {...productData}
		// @ts-ignore
		delete jsonData.photo;
		formData.append("json", JSON.stringify(jsonData))
		if (modalData.title === EnumModalTitle.Create) createProduct.mutate(formData)
		// @ts-ignore
		else editProduct.mutate({formData, id: productData.id})
		handleClose()
	}
	if ( sizes.isLoading || brands.isLoading || category.isLoading) return "Loading"
	return (
		<div className="fixed inset-0 bg-bgColor bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
				 onClick={()=> handleClose()}>
			<div className="relative bg-bgColor p-2.5 rounded-xl" onClick={(event)=> {
				event.stopPropagation()}}>
				<div className="w-[90%] mx-auto">
					<h2 className="text-center mb-6">{modalData.title}</h2>
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
											options={brands?.data?.map(item => item.name) || []}
											selectOption={productData.brand.name}
											setOptions={(newValue) => setProductData({ ...productData, brand: {id: findId(newValue, brands?.data || [])?.id || -1, name: newValue}})}/>
							<Select className="mb-5 mr-6" isAddOther={true}
											title="Категорія"
											options={category?.data?.map(item => item.name) || []}
											selectOption={productData.category.name}
											setOptions={(newValue) => setProductData({ ...productData, category: {id: findId(newValue, category?.data || [])?.id || -1, name: newValue} })}/>
							<Select className="mb-5 mr-6"
											title="Стать"
											options={genders}
											selectOption={productData.gender}
											setOptions={(newValue) => setProductData({ ...productData, gender: newValue })}/>
						</div>
						<SizeList
							sizes={sizes?.data || []}
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