"use client"
import React, {useState} from 'react';
import {NextPage} from "next";
import DataTable from "@/app/(routes)/dashboard/products/DataTable";
import ModalsCreateEditProduct from "@/app/components/modals/ModalsCreateEditProduct";
import {rowsDetails} from "@/app/constants/dashboard.constants";

const Products: NextPage = () => {

	return (
		<div className="container">
			<DataTable/>
		</div>
	);
};

export default Products;