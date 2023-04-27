import { Database } from "@/schema";
import Container from "../Layout/Container";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

type ProductType = {
  products: Database["public"]["Tables"]["products"]["Row"][];
};

const Audio = ({ products }: ProductType) => {
  return (
    <div className="my-8">
      <Container>
        <div className="border border-neutral-300 rounded w-full grid grid-cols-6">
          <div className="border-r border-neutral-300 relative col-span-1 flex flex-col justify-center">
            <Image
              src="/images/home/headphones.jpg"
              width={768}
              height={768}
              alt="Audio Devices"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 px-6 py-8 bg-neutral-600/60 flex flex-col justify-center">
              <h3 className="text-neutral-100 font-medium text-md lg:text-2xl">
                Audio
              </h3>
              <p className="text-md text-neutral-100">
                Headphones and earphones
              </p>
              <Link
                href="/products/categories/audio"
                className="bg-white text-neutral-600 font-medium text-md px-4 py-2 rounded inline-block text-center shadow hover:shadow-md  transition duration-100"
              >
                Buy Now
              </Link>
            </div>
          </div>{" "}
          <div className="grid grid-cols-5 col-span-5 grid-rows-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="last-of-type:border-r-0 border-b border-r border-neutral-300 w-full px-8 py-6 flex justify-start items-center"
              >
                <div className="flex justify-center items-center flex-col px-3">
                  <p className="text-md font-medium text-neutral-700 text-center">
                    {product.sub_category.name}
                  </p>
                  <p className="text-neutral-500 font-medium">
                    {product.brand.name}
                  </p>
                </div>{" "}
                <Image
                  src={product.images[0].url}
                  width={product.images[0].width}
                  height={product.images[0].height}
                  alt={product.name}
                  className="object-cover w-20 h-20 aspect-square"
                />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Audio;
