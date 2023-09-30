"use client"

import {rows} from "@/app/constants/dashboard.constants";
import Image from "next/image";

export default function Home() {
  const products = rows
  return (
    <main className="container">
      {!products ? <div className="text-center">Наразі не має товарів в наявності</div> :
      <div className="grid grid-cols-1 md:grid-cols-8 gap-3">
        {products.map(product =>
          <div key={product.id} className="p-2 shadow rounded-xl">
              <Image src={product.photo} alt={"Product_Image"} width={300} height={300}/>
              <p>{product.name}</p>
              <p className="text-sm">{product.brand}</p>
              <p className="text-right">{product.price}</p>
          </div>
        )}
      </div>}
    </main>
  )
}
