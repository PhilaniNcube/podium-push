import Image from "next/image";
import Container from "../Layout/Container";
import PageTitle from "../Typograpghy/PageTitle";
import { Database } from "@/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { Fragment } from "react";

type BannerProps = {
  subCategories: Database['public']['Tables']['sub_category']['Row'][]
};

const HomePage = ({subCategories}:BannerProps) => {
  return (
    <section className="mt-3">
      <Container>
        <div className="w-full flex gap-6 py-2">
          <div className="w-1/6">
            <ScrollArea className="h-[500px] w-full rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-md font-medium leading-none">
                  Sub Categories
                </h4>
                <Separator />
                <div className="flex flex-col">
                  {subCategories.map((category) => (
                    <Fragment key={category.id}>
                      <Link
                        className="hover:bg-slate-200 rounded text-slate-600 px-4 py-2 font-medium"
                        href={`/sub-categories/${category.slug}`}
                      >
                        {category.name}
                      </Link>
                    </Fragment>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="flex-1 relative isolate rounded overflow-hidden shadow h-[500px]">
            <Image
              src="/images/home/desktop-banner.jpg"
              width={1280}
              height={853}
              alt="Banner"
              className="object-cover lg:aspect-[4/2] w-full"
            />
            <div className="absolute inset-0 px-4 md:px-10 lg:px-10 flex flex-col items-start justify-center bg-slate-500/30">
              <PageTitle title="Prime Podium Products" />
              <p className="text-md md:text-lg lg:text-xl text-slate-600 font-medium mt-3 leading-7 max-w-[40ch]">
                Gear Up for Top-Notch Finds - Dive In & Start Saving!
              </p>
            </div>
          </div>
          <div className="w-1/6">
            <div className="h-[500px] flex flex-col gap-2">
              <div className="flex-1 bg-blue-500 rounded flex flex-col items-start p-6">
                <span className="items-center">
                  <span className="h-16 w-16 bg-blue-200"></span>
                  <p className="text-sm text-white text-md font-medium flex items-center">
                    <UserIcon className="rounded-full text-white h-16 w-16 mr-2" />
                    Join Podium Push and Log In or Create an account
                  </p>
                </span>

                <Link
                  href="/log-in"
                  className="rounded-md text-white bg-blue-300 hover:bg-blue-400 shadow hover:shadow-lg text-xl text-center px-4 py-1 font-medium w-full"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="rounded-md mt-3 text-blue-600 bg-blue-50 hover:bg-blue-200 shadow hover:shadow-lg text-xl text-center px-4 py-1 font-medium w-full"
                >
                  Register
                </Link>
              </div>
              <div className="flex-1 flex flex-col bg-orange-500 rounded p-6">
                <p className="mb-4 text-lg text-white font-medium leading-5">
                  Looking for your schools sports apparel?
                </p>
                <Link
                  href="/products/categories/apparel"
                  className="rounded-md mt-1 text-blue-600 bg-blue-50 hover:bg-blue-200 shadow hover:shadow-lg text-xl text-center px-4 py-1 font-medium w-full"
                >
                  Apparel
                </Link>
              </div>
              <div className="flex-1 bg-green-500 rounded p-6 flex flex-col">
                <p className="mb-4 text-lg text-white font-medium leading-5">
                  Shop for laptops for school or work.
                </p>
                <Link
                  href={`/products/categories/computers/laptops`}
                  className="rounded-md mt-1 text-blue-600 bg-blue-50 hover:bg-blue-200 shadow hover:shadow-lg text-xl text-center px-4 py-1 font-medium w-full"
                >
                  Laptops
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default HomePage;
