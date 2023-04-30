/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { totalCartItemSelector, totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
import {  ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import formatter from "@/lib/formatter";
import Link from "next/link";


const CartSlider = () => {

  const totalItems = useAppSelector(totalCartItemSelector);
  const totalPrice = useAppSelector(totalPriceSelector);
  const cartItems = useAppSelector(state => state.cart.cartItems);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="flex flex-col items-center relative">
          <ShoppingBag />
          <p className="text-xs">Cart</p>
          {!!totalItems && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs flex items-center justify-center rounded-full px-1">
              {totalItems}
            </span>
          )}
        </span>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>View the items in your cart</SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="w-full  mt-4">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="w-full mb-3 border border-neutral-300 rounded-md py-2 flex items-center space-x-4"
            >
              <img
                src={item.product.images[0].url}
                alt={item.product.name}
                className="w-1/3 object-cover"
              />
              <div className="px-3">
                <p className="text-sm font-medium text-neutral-700">
                  {item.product.name}
                </p>
                <p className="mb-2 text-sm text-neutral-600">
                  {item.qty} x {item.product.price}
                </p>
                <Separator />
                <span className="text-xl font-medium mt-3 text-neutral-800 flex items-center justify-between">
                  <h5>Total</h5> {formatter(item.qty * item.product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <span className="text-xl font-medium text-blue-600 mt-4 flex items-center justify-between">
          <h2 className="text-2xl">Cart Total</h2>
          <h2 className="text-2xl">{formatter(totalPrice)}</h2>
        </span>
        <SheetFooter className="mt-5 flex flex-col">
          <Button className="w-full">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CartSlider;
