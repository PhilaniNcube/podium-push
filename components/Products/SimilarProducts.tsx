/* eslint-disable @next/next/no-img-element */
import { Product } from "@/interfaces";
import Container from "../Layout/Container";
import Link from "next/link";
import formatter from "@/lib/formatter";

const SimilarProducts = ({products}:{products:Product[]}) => {
  return (
    <div className="my-8 w-full">
      <div className="border border-neutral-300 rounded w-full py-4 px-6">
        <h3 className="text-xl font-semibold text-neutral-700">
          Similar Products
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id} className="w-full hover:shadow hover:bg-slate-200 rounded-md transition duration-300 py-2 px-3">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full object-cover"
              />
              <p className="text-xs sm:text-sm line-clamp-2 mt-2 text-neutral-400 font-medium leading-6">
                {product.name}
              </p>
              <h4 className="text-md font-medium text-neutral-600">
                {formatter(product.price)}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SimilarProducts;
