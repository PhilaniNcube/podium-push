/* eslint-disable @next/next/no-img-element */
"use client"

import Container from "@/components/Layout/Container";
import PageTitle from "@/components/Typograpghy/PageTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import formatter from "@/lib/formatter";
import { decrement, increment, remove, totalCartItemSelector, totalPriceSelector } from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const CartPage = () => {

   const totalItems = useAppSelector(totalCartItemSelector);
   const totalPrice = useAppSelector(totalPriceSelector);
   const cartItems = useAppSelector((state) => state.cart.cartItems);

   const dispatch = useAppDispatch();

  return (
    <section className="my-10">
      <Container>
        <div className="w-full">
          <PageTitle title="My Cart" />
          <div className="mt-6 w-full">
            <div className="w-full grid grid-cols-3 gap-8">
              <div className="col-span-3 lg:col-span-2 px-4 py-3 border border-neutral-300 rounded-md">
                {cartItems.length === 0
                  ? "Your cart is empty..."
                  : cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="w-full py-2 flex space-x-3"
                      >
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="h-24 w-24 object-cover border border-neutral-300 rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-md font-medium text-neutral-700">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Category: {item.product.category.name}/
                            {item.product.sub_category.name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            Brand: {item.product.brand.name}
                          </p>
                          <div className="flex items-center justify-start space-x-5 mt-3">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => dispatch(remove(item.product))}
                            >
                              {" "}
                              <Trash2 className="mr-2 h-4 w-4" /> Remove From
                              Cart
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-neutral-600 font-semibold text-lg">
                            {formatter(item.product.price * item.qty)}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => dispatch(decrement(item.product))}
                            >
                              <Minus />
                            </Button>
                            <span className="h-10 w-10 border border-neutral-300 rounded-md flex items-center justify-center">
                              {item.qty}
                            </span>
                            <Button
                              onClick={() => dispatch(increment(item.product))}
                            >
                              <Plus />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="col-span-3 lg:col-span-1 border border-neutral-300 bg-neutral-100 rounded-md px-4 py-6">
                <p className="text-lg text-neutral-800">
                  Cart Items: {totalItems}
                </p>
                <Separator />
                <span className="flex justify-between items-center mt-3 mb-6">
                  <p className="text-xl text-neutral-800 font-semibold">
                    Total:{" "}
                  </p>
                  <p className="text-xl text-neutral-800 font-semibold">
                    {formatter(totalPrice)}
                  </p>
                </span>
                <Link
                  href="/checkout"
                  className="px-6 py-2 rounded-md text-white text-md font-semibold w-full bg-blue-800 text-center mt-4"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default CartPage;
