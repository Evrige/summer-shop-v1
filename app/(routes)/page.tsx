"use client"

import Image from "next/image";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import React, { useState} from "react";
import Pagination from "@/app/components/UI/Pagination";
import {LuShoppingCart} from "react-icons/lu";
import {toPrice} from "@/app/utils/toPrice";
import {useRouter} from "next/navigation";
import Filter from "@/app/components/FilterProduct/Filter";
import Loading from "@/app/(routes)/Loading";
import {useParams} from "@/app/hooks/useParams";
import {useMinMaxPrice} from "@/app/hooks/useMinMaxPrice";
import {EnumParams} from "@/app/types/main.interface";
import {getParamsTitle} from "@/app/utils/getParamsTitle";;
import {RxCross2} from "react-icons/rx";
import {IProductProperty} from "@/app/types/product.interface";
export default function Home() {
  const products = useAllProducts();
  const router = useRouter();
  const perPage = 24;
  const [firstIndex, setFirstIndex] = useState(0);

  const price = useMinMaxPrice()

  const {paramsList, setParamsList} = useParams(price.minPrice, price.maxPrice)
  const keys = Object.keys(paramsList);

  if (products.isLoading || !products.data) return <Loading/>
  const productsList = products.data.slice(firstIndex, firstIndex + perPage)

  return (
    <main className="container mt-2 ">
      <section className="flex my-2">
        {
          keys.map((key) => {
            const value = paramsList[key];
            if (Array.isArray(value) && value.length > 0) {
              return value.map(item => <span key={item.id} className="flex border-secondary p-2 border mr-1">{item.name}
                <RxCross2 onClick={()=>{
                  setParamsList((prevState) => ({
                    ...prevState,
                    [key]: prevState[key].filter((item:IProductProperty) => item.id !== item.id),
                  }));
                }}/></span>)
            }
            else if (key === EnumParams.gender && paramsList[key])
              return <span key={getParamsTitle(key)} className="flex border-secondary p-2 border mr-1">
              {paramsList[key]}<RxCross2 onClick={()=>{
                setParamsList((prevState) => ({
                  ...prevState,
                  [key]: "",
                }));
              }}/></span>

            if (key === EnumParams.price && (paramsList.price.minValue !== price.minPrice || paramsList.price.maxValue !== price.maxPrice) && paramsList.price.minValue !== paramsList.price.maxValue)
              return <span key={getParamsTitle(key)} className="flex border-secondary p-2 border mr-1">
              {`${paramsList.price.minValue}-${paramsList.price.maxValue}`}<RxCross2 onClick={()=>{
                setParamsList((prevState) => ({
                  ...prevState,
                  [key]: {
                    minValue: price.minPrice,
                    maxValue: price.maxPrice,
                  },
                }));
              }}/></span>

          })
        }
      </section>
      <section className="flex">
        <aside className="w-1/3">
          <Filter paramsList={paramsList} setParamsList={setParamsList} minMaxPrice={price}/>
        </aside>
        <div>
          {products.isLoading ? <div>Loading...</div> :
            !products.data?.length ? <div className="text-center">Наразі не має товарів в наявності</div>
              :
              <div className="grid grid-cols-1 xl:grid-cols-7 lg:grid-cols-4 gap-3">
                {productsList?.map((product) => (
                  <div key={product.id} className="p-2 shadow rounded-xl cursor-pointer flex flex-col"
                       onClick={()=> router.push(`/${product.name.replace(" ", "-")}/${product.id}`)}>
                    <div className="flex-grow flex items-center">
                      <Image src={product.photo} alt={"Product_Image"} width={300} height={300} priority/>
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="text-[18px] mt-1 overflow-hidden h-10 line-clamp-2">{product.name}</p>
                      <p className="text-xs text-textSecondary overflow-hidden h-4">{product.brand}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xl overflow-hidden h-6">{toPrice(product.price)}</span>
                        <LuShoppingCart className="text-secondary text-xl"/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
          <Pagination listLength={products.data.length} perPage={perPage} setFirstIndex={setFirstIndex}/>
        </div>
      </section>
    </main>
  )
}


