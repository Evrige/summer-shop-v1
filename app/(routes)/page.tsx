"use client"
import React, {Suspense, useEffect} from "react";
import Filter from "@/app/components/FilterProduct/Filter";
import {useUserParams} from "@/app/hooks/Params/useUserParams";
import ActiveFilter from "@/app/components/FilterProduct/ActiveFilter";
import UserProductsList from "@/app/components/productsList/userProductsList";
import Loading from "@/app/(routes)/Loading";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import {useSearchParams} from "next/navigation";
import {useUserHistory} from "@/app/hooks/productHooks/useUserHistory";
import {useAuth} from "@/app/hooks/useAuth";
import {useTopProducts} from "@/app/hooks/productHooks/useTopProducts";
import UserProductsItem from "@/app/components/productsList/UserProductsItem";
import {useServerParams} from "@/app/hooks/Params/useServerParams";
export default function Home() {
  const params = useServerParams();
  const products = useAllProducts(params || "");
  const { user } = useAuth();
  useUserParams();

  const searchParams = useSearchParams().size > 0;
  const userHistoryList = useUserHistory();
  const userTopProductList = useTopProducts();
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
        <aside className="w-1/3 max-w-[230px]">
          <Filter />
        </aside>
        <div>
          {!searchParams && user && (
            <div>
              <h2 className="mt-1">Історія переглядів:</h2>
              <div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-4 gap-3">
                {userHistoryList?.data?.map((product) => (
                  <UserProductsItem product={product} key={product.id} />
                ))}
              </div>
              <h2 className="mt-1">Спеціяльно для вас:</h2>
              <div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-4 gap-3">
                {userTopProductList?.data?.map((product) => (
                  <UserProductsItem product={product} key={product.id} />
                ))}
              </div>
            </div>)
          }
          {!searchParams && user && <h2 className="mt-1">Перелік товарів:</h2>}
          <UserProductsList />
        </div>
      </section>
    </main>
  );
}



