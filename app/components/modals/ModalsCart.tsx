import React from 'react';
import {RxCross1} from "react-icons/rx";
import UserTopList from "@/app/components/products/HistoryTop/UserTopList";

interface IProps {
	handleClose: () => void
}
const ModalsCart = ({handleClose}: IProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-scroll"
				 onClick={()=> handleClose()}>
			<div className="relative bg-bgColor rounded-[7px] w-2/3 min-h-[600px]"
					 onClick={(event)=> {
				event.stopPropagation()}}>
				<div className="p-2 border border-b-secondary rounded-t-[7px]">
					<h2 className="text-xl font-semibold">Кошик</h2>
				</div>


				{/*<UserTopList/>*/}
				<RxCross1 className="absolute right-1 top-1 cursor-pointer"
									onClick={()=> handleClose()}/>
			</div>
		</div>
	);
};

export default ModalsCart;