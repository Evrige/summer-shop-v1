import React, {useState} from 'react';
import {EnumGender, IFindId, IProduct, ISize} from "@/app/types/product.interface";
import Select from "@/app/components/UI/Select";
import Input from "@/app/components/UI/Input";
import SizeList from "@/app/components/SizeList";
import SelectFile from "@/app/components/UI/SelectFile";
import {RxCross1} from "react-icons/rx";
import {genders} from "@/app/constants/product.constants";
import {ProductService} from "@/app/service/product.service";
import Cookies from "js-cookie";
import {EnumSaveData} from "@/app/types/user.interface";
interface IProps {
	data:{
		title?: string,
		product?: IProduct
	}
	handleClose: () => void
}

console.log(Cookies.get(EnumSaveData.access))
	const brands1 =  ProductService.getBrands()
	const category1 = ProductService.getCategory()
	const sizes1 = ProductService.getSizes()
	const brands = [
		{
			id: 1,
			name: "Nike"
		},
		{
			id: 2,
			name: "Puma"
		},
		{
			id: 3,
			name: "Adidas"
		},
	]
	const category = [
		{
			id: 1,
			name: "Шорти"
		},
		{
			id: 2,
			name: "Футболка"
		},
		{
			id: 3,
			name: "Кепка"
		},
	]
	const sizes = [
		{
			id: 1,
			name: "XS",
		},
		{
			id: 2,
			name: "S",
		},
		{
			id: 3,
			name: "M",
		},
		{
			id: 4,
			name: "L",
		},
	]
const ModalsCreateEditProduct = ({data, handleClose}: IProps) => {
	const {title, product} = data;
	const findId = (name:string, data:IFindId[]) => data.find(item => item.name === name)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [productData, setProductData] = useState({
		id: product?.id,
		name: product?.name || "",
		photo: product?.photo || "/images/noImage.png",
		description: product?.description || "",
		price: product?.price || 0,
		brand: {
			id: product?.brand.id || -1,
			name: product?.brand.name || ""
		},
		category: {
			id: product?.category.id || -1,
			name: product?.category.name || ""
		},
		gender: product?.gender || "MAN",
		size: product?.size || []
	})
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
											options={brands.map(item => item.name)}
											selectOption={productData.brand.name}
											setOptions={(newValue) => setProductData({ ...productData, brand: {id: findId(newValue, brands)?.id || -1, name: newValue}})}/>
							<Select className="mb-5 mr-6" isAddOther={true}
											title="Категорія"
											options={category.map(item => item.name)}
											selectOption={productData.category.name}
											setOptions={(newValue) => setProductData({ ...productData, category: {id: findId(newValue, category)?.id || -1, name: newValue} })}/>
							<Select className="mb-5 mr-6"
											title="Стать"
											options={genders}
											selectOption={productData.gender}
											setOptions={(newValue) => setProductData({ ...productData, gender: newValue })}/>
						</div>
						<SizeList
							sizes={sizes}
							sizesCount={productData.size}
							changeSizeCount={changeSizeCount}
						/>
					</div>
					<div className="flex justify-center my-1 mt-5">
						<button className="w-1/3 text-[18px] rounded-xl bg-primary py-2"
										onClick={()=>{}}>Створити</button>
					</div>
					<RxCross1 className="absolute right-2 top-2 cursor-pointer" onClick={()=> handleClose()}/>
				</div>
			</div>
		</div>
	);
};

export default ModalsCreateEditProduct;