"use client"

import Image from "next/image";
import {useAllProducts} from "@/app/hooks/productHooks/useAllProducts";
import React, {useState} from "react";
import Pagination from "@/app/components/UI/Pagination";
import {LuShoppingCart} from "react-icons/lu";
import {toPrice} from "@/app/utils/toPrice";
import {useRouter} from "next/navigation";
export default function Home() {
  const products = useAllProducts()
  const router = useRouter()

  const perPage = 24;
  const [firstIndex, setFirstIndex] = useState(0)

  if (products.isLoading || !products.data) return "load"

  const productsList = products.data.slice(firstIndex, firstIndex + perPage)
  return (
    <main className="container mt-2 flex ">
      <aside className="w-1/5">
        <div><h1 className="text-secondary">Тут типо фильтр</h1></div>
      </aside>
      <section>
        {products.isLoading ? <div>Loading...</div> :
          !products.data?.length ? <div className="text-center">Наразі не має товарів в наявності</div>
            :
            <div className="grid grid-cols-1 xl:grid-cols-8 lg:grid-cols-4 gap-3">
              {productsList?.map((product) => (
                <div key={product.id} className="p-2 shadow rounded-xl cursor-pointer flex flex-col"
                     onClick={()=> router.push(`/${product.name.replace(" ", "_")}/${product.id}`)}>
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
      </section>
    </main>
  )
}


