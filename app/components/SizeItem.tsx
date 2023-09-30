import {ISize} from "@/app/types/product.interface";
import React from "react";

interface IProps {
	size: ISize,
	count: number,
	changeSizeCount: (size: ISize, newCount: number) => void
}
const SizeItem = ({ size, changeSizeCount, count }: IProps) => {
	return (
		<div>
			<button className=" w-[20px] text-[18px] rounded-bl rounded-tl bg-secondary py-1"
							onClick={() => changeSizeCount(size, count-1)}>-</button>
			<input min="0"
						 inputMode="numeric"
						 pattern="[0-9]*"
						 type="number"
						 value={count}
						 className="appearance-none max-w-[50px] text-center custom-input py-1"
						 onChange={(e) => changeSizeCount(size, parseInt(e.target.value))}/>
			<button className=" w-[20px] text-[18px] rounded-br rounded-tr bg-secondary py-1"
							onClick={() => changeSizeCount(size, count+1)}>+</button>
		</div>
	);
}

export default SizeItem