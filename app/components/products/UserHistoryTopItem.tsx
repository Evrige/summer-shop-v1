import React from 'react';
import UserProductsItem from "@/app/components/products/UserProductsItem";
import {IProductResponse} from "@/app/types/product.interface";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
interface IProps {
	productsList: IProductResponse[]
	title: string
}
const UserHistoryTopItem = ({ productsList, title }: IProps) => {
	return (
		<div className="">
			<h2 className="mt-2">{title}</h2>
			<Carousel additionalTransfrom={0}
								arrows
								autoPlaySpeed={3000}
								centerMode={false}
								className=""
								containerClass="container"
								dotListClass=""
								draggable
								focusOnSelect={false}
								infinite={false}
								itemClass=""
								keyBoardControl
								minimumTouchDrag={80}
								pauseOnHover
								renderArrowsWhenDisabled={false}
								renderButtonGroupOutside={false}
								renderDotsOutside={false}
								responsive={{
									desktop: {
										breakpoint: {
											max: 3000,
											min: 1024
										},
										items: 7,
									},
									mobile: {
										breakpoint: {
											max: 464,
											min: 0
										},
										items: 1,
										partialVisibilityGutter: 30
									},
									tablet: {
										breakpoint: {
											max: 1024,
											min: 464
										},
										items: 2,
										partialVisibilityGutter: 30
									}
								}}
								rewind={false}
								rewindWithAnimation={false}
								rtl={false}
								shouldResetAutoplay
								showDots={false}
								sliderClass=""
								slidesToSlide={1}
								swipeable>
				{productsList?.map((product) => (
					<div key={product.id} className="my-1">
						<UserProductsItem product={product} />
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default UserHistoryTopItem;