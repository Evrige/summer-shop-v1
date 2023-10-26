import React, {ChangeEvent} from 'react';

interface IProps {
	minPrice: number
	maxPrice: number
	price: {
		minValue: number
		maxValue: number
	}
	setPrice: (e: any) => void
}
const PriceFilter = ({minPrice, maxPrice, price, setPrice}: IProps) => {
	const handleMinValue = (e:ChangeEvent<HTMLInputElement>) =>
		setPrice({minValue: +e.target.value >= price.maxValue ? price.maxValue - 1 : +e.target.value, maxValue: price.maxValue})
	const handleMaxValue = (e:ChangeEvent<HTMLInputElement>) =>
		setPrice({maxValue: +e.target.value <= price.minValue ? price.minValue + 1 : +e.target.value, minValue: price.minValue})
	return (
		<div>
			<div  className="flex justify-center">
				<div>
					<input type="number"
								 className="w-[60px] p-1 custom-input focus:outline-none border rounded-[7px] text-center"
								 value={price.minValue}
								 onChange={handleMinValue}/>
					<span className="p-2">-</span>
					<input type="number"
								 className="w-[60px] p-1 custom-input focus:outline-none border rounded-[7px] text-center"
								 value={price.maxValue}
								 onChange={handleMaxValue}/>
				</div>
				<button className="ml-3 bg-primary px-2 py-1 rounded-[7px]">OK</button>
			</div>
			<div className="mt-3 mr-2">
				<div className="relative bg-bgColor h-[5px] rounded-[5px]">
					<div className="absolute h-[5px] rounded-[5px] bg-primary" style={{
						left: `${Math.round((price.minValue / maxPrice) * 100)}%`,
						right: `${100 - Math.round((price.maxValue / maxPrice) * 100)}%`}}></div>
				</div>
				<div className="relative range-input">
					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						value={price.minValue >= price.maxValue ? price.maxValue - 1 : price.minValue }
						onChange={handleMinValue}
						step={1}
					/>
					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						value={price.maxValue <= price.minValue ? price.minValue + 1 : price.maxValue }
						onChange={handleMaxValue}
						step={1}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;