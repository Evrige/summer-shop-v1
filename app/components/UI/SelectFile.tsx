import React, {useRef} from 'react';
import Image from "next/image";

interface IProps {
	image: string | undefined,
	handleFileChange: (e:React.ChangeEvent<HTMLInputElement>)=> void
}
const SelectFile = ({image, handleFileChange}: IProps) => {
	const filePicker = useRef(null)
	const handlePick = () => {
		// @ts-ignore
		filePicker.current.click();
	}

	return (
		<div className="mb-6 w-full flex items-start flex-col">
			<h2>Фото:</h2>
			<Image onClick={handlePick} className="mt-1 rounded-xl shadow hover:border-secondary border-[1px] max-h-[300px] w-auto" src={image || ""} width={300} height={300} alt="product_image"/>
			<input className="hidden"
						 type="file"
						 ref={filePicker}
						 accept="image/*"
						 onChange={handleFileChange}/>
		</div>
	);
};

export default SelectFile;