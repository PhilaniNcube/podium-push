"use client"

import Image from "next/image";
import { useState } from "react";
import { ProductProps } from "./ProductDetails";
import formatter from "@/lib/formatter";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { decrement, increment, productQtySelector } from "@/store/features/cartSlice";


const TopSection = ({product}:ProductProps) => {

  const [image, setImage] = useState(product.images[0])

  const qty = useAppSelector((state) => productQtySelector(state, product.id))

  const dispatch = useAppDispatch()

  return (
    <section className="mt-10 border border-neutral-200 rounded-md px-4 flex flex-col py-4 lg:flex-row gap-6">
      <div className="w-full md:w-1/2 lg:w-1/3">
        <Image
          className="rounded-md w-full object-cover border border-neutral-200"
          src={image.url}
          width={image.width}
          height={image.height}
          alt={product.name}
        />
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="border border-neutral-300 rounded overflow-hidden w-full cursor-pointer"
              onClick={() => setImage(product.images[index])}
            >
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={product.name}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3">
        <span
          className={`${
            product.in_stock ? "text-green-500" : "text-red-500"
          } font-medium text-sm`}
        >
          {product.in_stock ? "In Stock" : "Out Of Stock"}
        </span>
        <h1 className="text-neutral-800 font-semibold text-lg md:text-xl">
          {product.name}
        </h1>
        <p className="text-xs">{product.product_code}</p>
        <div className="flex justify-between items-center w-full my-1 font-medium py-3 px-6  rounded-md">
          <p className="text-sm text-neutral-400">{product.brand.name}</p>
          <Separator orientation="vertical" className="" />
          <p className="text-sm text-neutral-400">{product.category.name}</p>
          <Separator orientation="vertical" className="" />
          <p className="text-sm text-neutral-400">
            {product.sub_category.name}
          </p>
        </div>
        <p className="text-blue-600 text-lg md:text-2xl mt-2 font-semibold">
          {formatter(product.price)}
        </p>
        <div className="w-full mt-4">
          <h3 className="text-xl font-medium text-neutral-400">Details</h3>
          <Separator />
          {product?.details?.map((detail) => (
            <p
              key={detail.key}
              className="py-1 flex w-full md:w-2/3 justify-between text-neutral-500 font-bold"
            >
              <span>{detail.key}:</span>
              <span className="font-medium">{detail.value}</span>
            </p>
          ))}
          <Separator />
          <p className="py-1 flex w-full md:w-2/3 justify-between text-neutral-500 font-bold">
            <span>Warranty:</span>
            <span className="font-medium">{product.warranty}</span>
          </p>
          <p className="py-1 flex w-full md:w-2/3 justify-between text-neutral-500 font-bold">
            <span>Refund Policy:</span>
            <span className="font-medium">{product.refund_policy}</span>
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 md:rounded-r-md shadow px-4 py-6">
        <h3 className="text-neutral-700 text-xl font-bold">Description</h3>
        <p className="text-xs md:text-sm text-neutral-500 leading-6 mb-4">
          {product.description}
        </p>
        <Separator />
        <h3 className="text-neutral-700 text-xl my-3 font-bold">Add To Cart</h3>

        <div className="w-full md:w-2/3 lg:w-2/4 mx-auto flex mt-3 items-center justify-between">
          <Button
            onClick={() => dispatch(decrement(product))}
            disabled={!qty || qty === 0}
          >
            <MinusIcon className="text-white" />
          </Button>
          <p className="text-xl font-medium rounded-md flex h-12 w-12 bg-white p-2 items-center justify-center">
            {qty ? qty : 0}
          </p>
          <Button onClick={() => dispatch(increment(product))}>
            <PlusIcon className="text-white" />
          </Button>
        </div>
        <Separator className="mt-8" />
        <Button className="w-full text-xl uppercase mt-8">Open Cart</Button>
      </div>
    </section>
  );
};
export default TopSection;
