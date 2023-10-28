import React, {ChangeEvent, useEffect, useState} from 'react';

interface IProps {
	minMaxPrice: {
		minPrice: number
		maxPrice: number
	}
	setPrice: (e: any) => void
}

const PriceFilter = ({minMaxPrice, setPrice}: IProps) => {
	const [value, setValue] = useState({
		minValue: minMaxPrice.minPrice,
		maxValue: minMaxPrice.maxPrice,
	});
	useEffect(() => {
		setValue({
			minValue: minMaxPrice.minPrice,
			maxValue: minMaxPrice.maxPrice,
		})
	}, [minMaxPrice.minPrice, minMaxPrice.maxPrice]);
	const handleMinValue = (e: ChangeEvent<HTMLInputElement>) =>
		setValue({
			minValue: +e.target.value >= value.maxValue ? value.maxValue - 1 : +e.target.value,
			maxValue: value.maxValue,
		});

	const handleMaxValue = (e: ChangeEvent<HTMLInputElement>) =>
		setValue({
			maxValue: +e.target.value <= value.minValue ? value.minValue + 1 : +e.target.value,
			minValue: value.minValue,
		});

	return (
		<div>
			<div  className="flex justify-center">
				<div>
					<input type="number"
								 className="w-[60px] p-1 custom-input focus:outline-none border rounded-[7px] text-center"
								 value={value.minValue}
								 onChange={handleMinValue}/>
					<span className="p-2">-</span>
					<input type="number"
								 className="w-[60px] p-1 custom-input focus:outline-none border rounded-[7px] text-center"
								 value={value.maxValue}
								 onChange={handleMaxValue}/>
				</div>
				<button className="ml-3 bg-primary px-2 py-1 rounded-[7px]"
								onClick={()=>setPrice(value)}>OK</button>
			</div>
			<div className="mt-3 mr-2">
				<div className="relative bg-bgColor h-[5px] rounded-[5px]">
					<div className="absolute h-[5px] rounded-[5px] bg-primary" style={{
						left: `${Math.round((value.minValue / minMaxPrice.maxPrice) * 100)}%`,
						right: `${100 - Math.round((value.maxValue / minMaxPrice.maxPrice) * 100)}%`}}></div>
				</div>
				<div className="relative range-input">
					<input
						type="range"
						min={minMaxPrice.minPrice}
						max={minMaxPrice.maxPrice}
						value={value.minValue >= value.maxValue ? value.maxValue - 1 : value.minValue }
						onChange={handleMinValue}
						step={1}
					/>
					<input
						type="range"
						min={minMaxPrice.minPrice}
						max={minMaxPrice.maxPrice}
						value={value.maxValue <= value.minValue ? value.minValue + 1 : value.maxValue }
						onChange={handleMaxValue}
						step={1}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;