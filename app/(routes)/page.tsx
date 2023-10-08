"use client"

import Image from "next/image";
import {useProducts} from "@/app/hooks/useProducts";
import {useActions} from "@/app/hooks/useActions";
import {useEffect} from "react";


export default function Home() {
  const actions = useActions()
  const products = useProducts()
  useEffect(() => {
    actions.getProducts()
    console.log("effect")
  }, [actions]);
  console.log(products?.products)
  return (
    <main className="container">
      {products?.products.length === 0 ? (
        <div className="text-center">Наразі не має товарів в наявності</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
          {products.products.map((product) => (
            <div key={product.id} className="p-2 shadow rounded-xl">
              <Image src={product.photo} alt={"Product_Image"} width={300} height={300} priority/>
              <p>{product.name}</p>
              <p className="text-sm">{product.brand}</p>
              <p className="text-right">{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}


