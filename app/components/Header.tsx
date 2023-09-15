"use client"
import React, {FC} from 'react';
import Logo from "@/app/components/Logo";
import SearchInput from "@/app/components/UI/SearchInput";
import {FaCartShopping, FaUser} from "react-icons/fa6";
import {useSelector} from "react-redux";
import Link from 'next/link';
const Header:FC = () => {
	const userData = useSelector((state: any) => state.User)

	return (
		<div className="fixed w-full z-10">
			<div className="container mt-2.5 flex items-center justify-between">
				<Logo />
				<SearchInput />
				<div className="flex">
					<div className="flex items-center mr-5 justify-center">
						<FaUser className="mr-1.5"/>
						{!userData.isLogin ? (<Link href={'/login'}>Авторизація</Link>) : <span>Вітаю, {userData?.user?.username}</span>  }
					</div>
					<div className="flex items-center justify-center">
						<FaCartShopping className="mr-1.5"/>
						Кошик
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;