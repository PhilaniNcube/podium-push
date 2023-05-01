/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import PageTitle from "@/components/Typograpghy/PageTitle";
import { totalCartItemSelector, totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import formatter from "@/lib/formatter";
import { Button } from "@/components/ui/button";

const orderSchema = z.object({
  email: z.string().email(),
  first_name: z
    .string()
    .min(2, { message: "First name must be more than 2 charaters" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be more than 2 charaters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  payment_method: z.enum(["Card/EFT", "Intellimali"]),
  street_address: z
    .string()
    .min(4, { message: "Street address has to be more than 3 characters" }),
  suburb: z
    .string()
    .min(2, { message: "Suburb has to be more than 3 characters" }),
  city: z.string().min(4, { message: "City has to be more than 3 characters" }),
  postal_code: z.string(),
  discount_amount: z.number(),
  total_amount: z.number(),
});

type OrderSchema = z.infer<typeof orderSchema>

const CheckoutForm = () => {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<OrderSchema>({
      resolver: zodResolver(orderSchema),
      defaultValues: {
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        payment_method: "Card/EFT",
        street_address: "",
        suburb: "",
        city: "",
        postal_code: "",
        discount_amount: 0,
        total_amount: 0,
      }
    });


    const onSubmit: SubmitHandler<OrderSchema> = (data) => {

      console.log(data);

    }

      const totalItems = useAppSelector(totalCartItemSelector);
      const totalPrice = useAppSelector(totalPriceSelector);
      const cartItems = useAppSelector((state) => state.cart.cartItems);

  return (
    <div className="my-10">
      <div className="w-full">
        <PageTitle title="Checkout" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-md border border-neutral-300 px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6"
        >
          {/* Order Information */}
          <div className="w-full">
            <h2 className="text-neutral-800 text-lg font-medium">
              Contact Information
            </h2>

            <div className="w-full lg:w-3/4 mt-6">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                className="mt-1"
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  <AlertTriangle className="text-xs text-red-600" />
                  {errors.email?.message}
                </p>
              )}
            </div>

            <Separator className="mt-6 mb-4" />

            <h2 className="text-neutral-800 text-lg font-medium">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="w-full">
                <Label htmlFor="first_name" className="mb-2">
                  First Name
                </Label>
                <Input
                  type="text"
                  id="first_name"
                  {...register("first_name")}
                  className="mt-1"
                />
                {errors.first_name && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.first_name?.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="last_name" className="mb-2">
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="last_name"
                  {...register("last_name")}
                  className="mt-1"
                />
                {errors.last_name && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.last_name?.message}
                  </p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2 w-full">
                <Label htmlFor="street_address" className="mb-2">
                  Street Address
                </Label>
                <Input
                  type="text"
                  id="street_address"
                  {...register("street_address")}
                  className="mt-1"
                />
                {errors.street_address && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.street_address?.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Label htmlFor="suburb" className="mb-2">
                  Suburb
                </Label>
                <Input
                  type="text"
                  id="suburb"
                  {...register("suburb")}
                  className="mt-1"
                />
                {errors.suburb && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.suburb?.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="city" className="mb-2">
                  City
                </Label>
                <Input
                  type="text"
                  id="city"
                  {...register("city")}
                  className="mt-1"
                />
                {errors.city && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.city?.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Label htmlFor="postal_code" className="mb-2">
                  Postal Code
                </Label>
                <Input
                  type="text"
                  id="postal_code"
                  {...register("postal_code")}
                  className="mt-1"
                />
                {errors.postal_code && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.postal_code?.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <Label htmlFor="phone" className="mb-2">
                  Phone
                </Label>
                <Input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-xs italic text-red-500 mt-2">
                    <AlertTriangle className="text-xs text-red-600" />
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            </div>

            <Separator className="mt-6 mb-4" />

            <h2 className="text-neutral-800 text-lg font-medium">
              Payment Method
            </h2>

            <div>
              <RadioGroup
                {...register("payment_method")}
                id="payment_method"
                className="py-4 w-full md:w-1/2 grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border border-neutral-300 rounded-md px-4 py-3 bg-slate-100">
                  <RadioGroupItem value="Card/EFT" id="payment_method" />
                  <Label htmlFor="payment_method">Card/EFT</Label>
                </div>
                <div className="flex items-center space-x-2 border border-neutral-300 rounded-md px-4 py-3 bg-slate-100">
                  <RadioGroupItem value="Intellimali" id="payment_method" />
                  <Label htmlFor="payment_method">Intellimali</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full">
            <h2 className="text-neutral-800 text-lg font-medium">
              Order Summary
            </h2>

            <div>
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="px-4 py-3 w-full flex space-x-4 border-t mt-4 border-neutral-300"
                >
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-neutral-800 font-medium">
                      {item.product.name}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {item.product.brand.name}
                    </p>
                    <p className="text-neutral-600 text-sm">
                      Quantity: {item.qty}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-800 font-medium">
                      {formatter(item.product.price * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            <div>
              <div className="flex justify-between w-full text-xl">
                <p className="text-neutral-800 font-medium">Subtotal</p>
                <p className="text-neutral-800 font-medium">
                  {formatter(totalPrice)}
                </p>
              </div>
              <div className="flex justify-between w-full mt-3 text-xl">
                <p className="text-neutral-800 font-medium">Shipping</p>
                <p className="text-neutral-800 font-medium">{formatter(140)}</p>
              </div>{" "}
              <Separator className="my-5" />
              <div className="flex justify-between w-full mt-3 text-3xl font-semibold">
                <p className="text-neutral-700 font-medium">Total</p>
                <p className="text-neutral-700 font-medium">
                  {formatter(140 + totalPrice)}
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-3/4 lg:w-1/2 text-xl mt-6">Confirm Order</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
