import { getProducts, getTotalProductsCount } from "@/lib/fetchers/products";
import ProductsTable from "./ProductsTable";
import Link from "next/link";

const page = async ({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) => {
  const productsData = getProducts(+page);
  const countData = getTotalProductsCount();

  const [products, count] = await Promise.all([productsData, countData]);

  const pages = Math.ceil(count / 15);


  return (
    <div className="w-full">
      <ProductsTable products={products} page={+page} />
      <div className="w-full flex justify-center items-center mt-5 space-x-3">
        <p className="flex-1 text-lg font-semibold text-neutral-700">Page..</p>
        {[...Array(pages).keys()].map((i) => (
          <Link
            href={`/dashboard/products?page=${i + 1}`}
            key={i}
            className={`h-10 w-10 flex items-center justify-center rounded-md border border-neutral-300 hover:bg-neutral-100 transition duration-150 ${+page === i + 1 ? "pointer-events-none bg-blue-600 text-white font-semibold" : ""}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default page;
