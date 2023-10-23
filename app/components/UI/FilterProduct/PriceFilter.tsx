import React from 'react';

interface IProps {
	minPrice: number
	maxPrice: number
	inputRange: {
		minValue: number,
		maxValue: number
	}
	setInputRange: (obj: any) => void
}
const PriceFilter = ({minPrice, maxPrice, inputRange, setInputRange}: IProps) => {
	return (
		<div>
			<div  className="flex justify-between">
				<div>
					<input type="number"
								 className="w-[60px] p-1 custom-input focus:outline-none border rounded-[7px] text-center"
								 value={inputRange.minValue}
								 onChange={(e)=> setInputRange({...inputRange, minValue: +e.target.value >= inputRange.maxValue ? inputRange.maxValue - 1 : +e.target.value})}/>
					<span className="p-2">-</span>
					<input type="number"
								 className="w-[60px] p-1 custom-input focus:outline-none border rounded-[7px] text-center"
								 value={inputRange.maxValue}
								 onChange={(e)=> setInputRange({...inputRange, maxValue: +e.target.value >= inputRange.maxValue ? inputRange.maxValue - 1 : +e.target.value})}/>
				</div>
				<button className="mr-2">OK</button>
			</div>
			<div className="mt-3 mr-2">
				<div className="relative bg-bgColor h-[5px] rounded-[5px]">
					<div className="absolute h-[5px] rounded-[5px] bg-primary" style={{
						left: `${Math.round((inputRange.minValue / maxPrice) * 100)}%`,
						right: `${100 - Math.round((inputRange.maxValue / maxPrice) * 100)}%`}}></div>
				</div>
				<div className="relative range-input">
					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						value={inputRange.minValue >= inputRange.maxValue ? inputRange.maxValue - 1 : inputRange.minValue }
						onChange={(e)=> setInputRange({...inputRange, minValue: +e.target.value >= inputRange.maxValue ? inputRange.maxValue - 1 : +e.target.value})}
						step={1}
					/>
					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						value={inputRange.maxValue <= inputRange.minValue ? inputRange.minValue + 1 : inputRange.maxValue }
						onChange={(e)=> setInputRange({...inputRange, maxValue: +e.target.value <= inputRange.minValue ? inputRange.minValue + 1 : +e.target.value})}
						step={1}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;