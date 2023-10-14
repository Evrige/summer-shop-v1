"use client"
import React, {FC, useEffect, useRef, useState} from 'react';
import Logo from "@/app/components/Logo";
import SearchInput from "@/app/components/UI/SearchInput";
import {FaCartShopping, FaUser} from "react-icons/fa6";
import Link from 'next/link';
import {useAuth} from "@/app/hooks/useAuth";
import {useActions} from "@/app/hooks/useActions";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {EnumSaveData} from "@/app/types/user.interface";
import { dropDownMenuHeader} from "@/app/constants/main.constants";
import DropDownMenuHeader from "@/app/components/UI/DropDownMenuHeader/DropDownMenuHeader";
const Header:FC = () => {
	const userData = useAuth()
	const actions = useActions()
	const router = useRouter()
	const [open, setOpen] = useState(false)

	useEffect(()=>{
		if (Cookies.get(EnumSaveData.refresh)) actions.checkAuth()
		else router.push("/login")
	}, [actions, router, userData.isLogin])

	let menuRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (menuRef?.current?.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		document.removeEventListener("mousedown", handler);
	}, []);
	return (
		<div className="w-full z-10">
			<div className="container mt-2.5 flex items-center justify-between">
				<Logo />
				<SearchInput />
				<div className="flex" ref={menuRef}>
					<div className="flex items-center mr-5 justify-center">
						{userData?.user?.role === "ADMIN" && <Link href={"/dashboard"} className="mr-3 border border-secondary rounded-[5px] p-1.5">Адмін панель</Link>}
						<div className="flex justify-center items-center relative">
							<FaUser className="mr-1.5"/>
							{!userData.isLogin ? <Link href={'/login'}>Авторизація</Link>
								: <span onClick={()=> setOpen(!open)} className="cursor-pointer">Вітаю, {userData?.user?.username}</span>}
							<div className={`${open ? 'flex' : 'hidden'} dropdown-menu absolute top-9 right-1 rounded-[7px] bg-bgColor p-3`}>
								<DropDownMenuHeader setOpen={setOpen} list={dropDownMenuHeader}/>
							</div>
						</div>
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