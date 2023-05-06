/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Container from "@/components/Layout/Container";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { getProfile } from "@/lib/fetchers/profiles";
import { ShoppingCartIcon, TagIcon, UserIcon, UsersIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const layout = async ({children}:{children:ReactNode}) => {

  const profile = await getProfile()

  console.log({profile})

  return (
    <main>
      <Container>
        <div className="flex mt-6 h-screen">
          <ScrollArea className="w-[320px] h-full border-r-2 border-neutral-300 pr-3">
             <div className="rounded-md bg-slate-200 hover:bg-slate-300 transition duration-200 flex items-center space-x-4 mb-3 shadow-sm py-3 px-4">
              <UserIcon className="h-8 w-8 rounded-full object-cover bg-blue-400 text-white" />
              <h1 className="text-neutral-600 font-semibold text-lg">Podium Push</h1>
             </div>
            <Separator />
            <div className="mt-7">
              <Link href="/dashboard/orders" className="cursor-pointer text-neutral-600 text-xl font-semibold flex items-center space-x-3">
                <ShoppingCartIcon />
                <span>Orders</span>
              </Link>
              <Link href="/dashboard/products" className="mt-3 cursor-pointer text-neutral-600 text-xl font-semibold flex items-center space-x-3">
                <TagIcon />
                <span>Products</span>
              </Link>
              <Link href="/dashboard/customers" className="mt-3 cursor-pointer text-neutral-600 text-xl font-semibold flex items-center space-x-3">
                <UsersIcon />
                <span>Customers</span>
              </Link>
            </div>
          </ScrollArea>
          <ScrollArea className="flex-1 px-10 py-12 h-full">
            {children}
          </ScrollArea>
        </div>
      </Container>
    </main>
  );
};
export default layout;
