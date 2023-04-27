"use client"

import { ReactNode } from "react";

const Container = ({children}:{children:ReactNode}) => {
  return <div className="max-w-[2520px] mx-auto w-[90%] bg-transparent">
    {children}
  </div>;
};
export default Container;
