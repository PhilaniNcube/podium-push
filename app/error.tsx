"use client"

import { AlertTriangle } from "lucide-react";

const error = () => {
  return <div className="flex flex-col items-center justify-center">
    <AlertTriangle className="text-red-600 w-1/2" />
  </div>;
};
export default error;
