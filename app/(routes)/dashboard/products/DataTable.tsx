import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from "next/image";
import {BiEdit} from "react-icons/bi";
import {MdOutlineDeleteOutline} from "react-icons/md";
import {useState} from "react";
import ModalsCreateEditProduct from "@/app/components/modals/ModalsCreateEditProduct";
import {rows, rowsDetails} from "@/app/constants/dashboard.constants";

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70},
	{ field: 'name', headerName: 'Назва', minWidth: 200, headerAlign: "center", align: "center"},
	{ field: 'photo', headerName: 'Фото', minWidth: 400, headerAlign: "center", align: "center",
		renderCell: params =>
			(<><Image src={params.row.photo} alt="img" width={200} height={200}/></>)
	},
	{ field: 'brand', headerName: 'Бренд', minWidth: 200, headerAlign: "center", align: "center"},
	{ field: 'price', headerName: 'Ціна, грн', type: 'number', width: 200},
];
export default function DataTable() {
	const [visible, setVisible] = useState(false);
	const [modalData, setModalData] = useState({});

	const actionColumn = [{
		field: "action",
		headerName: "Дія",
		minWidth: 300,
		headerAlign: "center",
		align: "center",
		renderCell: (params:any) =>{
			return (
				<div className="flex justify-center items-center">
					<BiEdit name="Редагувати" className="text-xl mr-3 text-blue-500" onClick={()=>{
						setModalData({title:"Редагувати", product: rowsDetails})
						setVisible(true)
					}}/>
					<MdOutlineDeleteOutline name="Видалити" className="text-xl text-primary" onClick={()=>{}}/>
				</div>
			)
		}
	}]

	return (
		<div className="container mt-5 max-w-full">
			<div className="flex justify-between items-center mb-3">
				<h1>Інформація про товари:</h1>
				<button className="w-1/12 text-[18px] rounded-xl bg-primary py-2"
								onClick={()=>{
									setModalData({title:"Створити"})
									setVisible(true)
								}}>Створити</button>
			</div>
			<DataGrid
				rows={rows}
				// @ts-ignore
				columns={columns.concat(actionColumn)}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				disableRowSelectionOnClick
				pageSizeOptions={[5, 10]}
			/>
			{visible &&<ModalsCreateEditProduct data={modalData} handleClose={()=> setVisible(!visible)}/>}
		</div>
	);
}
