import type { Metadata } from 'next'
import {Providers} from "@/app/store/Providers";
import React from "react";
import MenuList from "@/app/components/MenuList";
import {dashboardList} from "@/app/constants/dashboard.constants";

export const metadata: Metadata = {
	title: 'Dashboard',
	description: '',
}

export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
		<body>
		<Providers>
			<MenuList list={dashboardList}/>
			{children}
		</Providers>
		</body>
		</html>
	)
}
