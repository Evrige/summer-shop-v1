"use client"
import React, {Suspense, useEffect} from "react";
import Filter from "@/app/components/FilterProduct/Filter";
import {useUserParams} from "@/app/hooks/Params/useUserParams";
import ActiveFilter from "@/app/components/FilterProduct/ActiveFilter";
import UserProductsList from "@/app/components/products/userProductsList";
import Loading from "@/app/(routes)/Loading";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import {useSearchParams} from "next/navigation";
import {useUserHistory} from "@/app/hooks/productHooks/useUserHistory";
import {useAuth} from "@/app/hooks/useAuth";
import {useTopProducts} from "@/app/hooks/productHooks/useTopProducts";
import UserProductsItem from "@/app/components/products/UserProductsItem";
import {useServerParams} from "@/app/hooks/Params/useServerParams";
import UserHistoryTopList from "@/app/components/products/UserHistoryTopList";
import UserHistoryTopItem from "@/app/components/products/UserHistoryTopItem";
export default function Home() {
  const params = useServerParams();
  const products = useAllProducts(params || "");
  const { user } = useAuth();
  useUserParams();
  const userHistoryList = useUserHistory();
  const userTopProductList = useTopProducts();
  const searchParams = useSearchParams().size > 0;

  useEffect(() => {
    if (products.isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";

    } else {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0";
    };
  }, [products.isLoading]);
  return (
    <main className="container mt-2 ">
      <ActiveFilter />
      <section className="flex">
        <aside className="2xl:min-w-[220px] mr-2 flex-none">
          <Filter />
        </aside>
        <div className="flex-auto overflow-y-auto">
          {!searchParams && user && <UserHistoryTopList/>}
          <>
            {!searchParams && user && <h2 className="mt-1">Перелік товарів:</h2>}
            <UserProductsList/>
          </>
        </div>
      </section>
    </main>
  );
}



