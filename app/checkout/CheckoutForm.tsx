"use client"

import { totalCartItemSelector, totalPriceSelector } from "@/store/features/cartSlice";
import { useAppSelector } from "@/store/store";

const CheckoutForm = () => {

      const totalItems = useAppSelector(totalCartItemSelector);
      const totalPrice = useAppSelector(totalPriceSelector);
      const cartItems = useAppSelector((state) => state.cart.cartItems);

  return <div>CheckoutForm</div>;
};
export default CheckoutForm;
