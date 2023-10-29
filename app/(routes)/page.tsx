"use client"

import React from "react";
import Filter from "@/app/components/FilterProduct/Filter";
import {useParams} from "@/app/hooks/useParams";
import ActiveFilter from "@/app/components/FilterProduct/ActiveFilter";
import UserProductsList from "@/app/components/productsList/userProductsList";
import Loading from "@/app/(routes)/Loading";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
export default function Home() {
  const products = useAllProducts();
  useParams()
  if (products.isLoading) return <Loading/>
  return (
    <main className="container mt-2 ">
      <ActiveFilter/>
      <section className="flex">
        <aside className="w-1/3 max-w-[230px]">
          <Filter/>
        </aside>
        <UserProductsList/>
      </section>
    </main>
  )
}


