import { ReactNode } from "react";

const BodyText = ({children}:{children:ReactNode}) => {
  return <div className="text-sm lg:text-base text-slate-600 pr-4 md:pr-6 lg:pr-10 mt-4 md:mt-8">{children}</div>;
};
export default BodyText;
