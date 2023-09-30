"use client"
import React, {FC, useEffect} from 'react';
import Logo from "@/app/components/Logo";
import SearchInput from "@/app/components/UI/SearchInput";
import {FaCartShopping, FaUser} from "react-icons/fa6";
import {useSelector} from "react-redux";
import Link from 'next/link';
import {useAuth} from "@/app/hooks/useAuth";
import {FiLogOut} from "react-icons/fi";
import {useActions} from "@/app/hooks/useActions";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {EnumSaveData} from "@/app/types/user.interface";
const Header:FC = () => {
	const userData = useAuth()
	const actions = useActions()
	const router = useRouter()

	useEffect(()=>{
		if (Cookies.get(EnumSaveData.refresh)) actions.checkAuth()
		else router.push("/login")
	}, [actions, router, userData.isLogin])

	return (
		<div className="w-full z-10">
			<div className="container mt-2.5 flex items-center justify-between">
				<Logo />
				<SearchInput />
				<div className="flex">
					<div className="flex items-center mr-5 justify-center">
						{/*{userData?.user?.role === "ADMIN" && <Link href={"/dashboard"}>Адмін панель</Link>}*/}
						{userData.isLogin && <FiLogOut onClick={()=> actions.logout()}/>}
						<FaUser className="mr-1.5"/>
						{!userData.isLogin ? <Link href={'/login'}>Авторизація</Link> : <span>Вітаю, {userData?.user?.username}</span>  }
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