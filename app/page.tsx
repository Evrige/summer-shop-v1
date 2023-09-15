"use client"
import {useEffect} from "react";
import Cookies from "js-cookie";
import {EnumSaveData} from "@/app/store/user/user.interface";
import {useActions} from "@/app/hooks/useActions";

export default function Home() {

  const res = useActions()

  useEffect(()=>{
    if (Cookies.get(EnumSaveData.refresh)) res.checkAuth()
  }, [res])

  return (
    <main>

    </main>
  )
}
