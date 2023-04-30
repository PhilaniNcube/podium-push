"use client"

import Link from "next/link";
import Container from "../Layout/Container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Database } from "@/schema";
import { CarIcon, LogInIcon, MessageCircle, SearchIcon, SeparatorHorizontal, ShoppingBag, UserIcon, UserPlusIcon } from "lucide-react";
import { Fragment } from "react";
import { useAppSelector } from "@/store/store";
import { totalCartItemSelector } from "@/store/features/cartSlice";

type HeaderProps = {
  categories: Database['public']['Tables']['categories']['Row'][];
  subCategories: Database['public']['Tables']['sub_category']['Row'][];
  brands: Database['public']['Tables']['brands']['Row'][];
}

const Header = ({categories, subCategories, brands}:HeaderProps) => {

  const totalItems = useAppSelector(totalCartItemSelector)

const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  //get entries from Object.entries
  const {search, category} = Object.fromEntries(new FormData(e.currentTarget));

  console.log({search, category})
}


  return (
    <Fragment>
      <header className="shadow border-b">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="font-medium text-md lg:text-lg text-blue-600"
            >
              Podium Push
            </Link>
            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl border-2 border-blue-500 rounded-md flex overflow-hidden"
            >
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search"
                className="outline-none w-full flex-1  border-0 rounded-md focus-within:border-blue-700 focus:ring-0"
              />
              <div className="border-l border-blue-500 px-2 w-full max-w-[180px]">
                <Select name="category">
                  <SelectTrigger className="">
                    <SelectValue
                      className="w-fit text-sm font-medium text-slate-600 border-0 border-transparent outline-none focus:ring-0"
                      placeholder="Select Category"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-md font-bold text-slate-800">
                        Categories
                      </SelectLabel>

                      {categories.map((category, i) => (
                        <SelectItem
                          className="cursor-pointer text-slate-600 font-medium text-sm"
                          key={i}
                          value={category.slug!}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <button
                type="submit"
                className="rounded-r-md bg-blue-500 hover:bg-blue-700 text-center font-medium text-white flex items-center space-x-4 px-3 transition duration-150"
              >
                {" "}
                <SearchIcon />
                Search
              </button>
            </form>
            <div
              id="icons"
              className="flex items-center space-x-3 text-neutral-600"
            >
              <Link href="/profile" className="flex flex-col items-center">
                <UserIcon />
                <p className="text-xs">Profile</p>
              </Link>
              <Link href="/contact" className="flex flex-col items-center">
                <MessageCircle />
                <p className="text-xs">Message</p>
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center relative"
              >
                <ShoppingBag />
                <p className="text-xs">Cart</p>
                {!!totalItems && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs flex items-center justify-center rounded-full px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </Container>
      </header>
      <nav className="shadow border-b">
        <Container>
          <div className="py-2 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Categories</MenubarTrigger>
                  <MenubarContent>
                    {categories.map((category) => (
                      <MenubarItem key={category.id}>
                        <Link href={`/categories/${category.slug}?page=1`}>
                          {category.name}
                        </Link>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Brands</MenubarTrigger>
                  <MenubarContent>
                    {brands.map((brand) => (
                      <MenubarItem key={brand.id}>
                        <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>On Promotion</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link href={`/products/featured`}>Featured Products</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={`/products/sale`}>Clearance Sale</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link href={`/products/best-sellers`}>Best Sellers</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="text-md text-neutral-500 px-3 py-2 hover:bg-neutral-200 rounded font-medium flex space-x-2"
              >
                <LogInIcon />
                <p>Sign In</p>
              </Link>
              <Link
                href="/register"
                className="text-md text-neutral-500 px-3 py-2 hover:bg-neutral-200 rounded font-medium flex space-x-2"
              >
                <UserPlusIcon />
                <p>Register</p>
              </Link>
              <Link
                href="/shipping-and-returns"
                className="text-md text-neutral-500 px-3 py-2 hover:bg-neutral-200 rounded font-medium flex space-x-2"
              >
                <CarIcon />
                <p>Shipping & Returns</p>
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </Fragment>
  );
};
export default Header;
