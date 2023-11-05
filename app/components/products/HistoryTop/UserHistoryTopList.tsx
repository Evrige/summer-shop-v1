import React from 'react';
import {useUserHistory} from "@/app/hooks/productHooks/useUserHistory";
import {useTopProducts} from "@/app/hooks/productHooks/useTopProducts";
import UserHistoryTopItem from "@/app/components/products/HistoryTop/UserHistoryTopItem";

const UserHistoryTopList = () => {
	const userHistoryList = useUserHistory();
	const userTopProductList = useTopProducts();

	return (
		<>
			<UserHistoryTopItem productsList={userHistoryList.data || []} title="Історія переглядів"/>
			<UserHistoryTopItem productsList={userTopProductList.data || []} title="Спеціяльно для вас"/>
		</>
	);
};

export default UserHistoryTopList;