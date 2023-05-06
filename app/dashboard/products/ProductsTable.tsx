import { Product } from "@/interfaces";
import formatter from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/schema";
import Link from "next/link";
import { CheckCheckIcon, EyeIcon, XCircleIcon } from "lucide-react";

type ProductsTableProps = {
  products: Database["public"]['Tables']['products']['Row'][]
page: number;
}

const ProductsTable = ({products, page }:ProductsTableProps) => {



  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-neutral-700 font-semibold text-3xl">Products</h1>
          <p className="mt-3 text-md text-neutral-400 font-medium">
            List of products{" "}
          </p>
        </div>

        <Link
          href="/dashboard/products/create"
          className="bg-blue-500 text-white text-lg font-semibold px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      <table className="w-full rounded-lg border border-neutral-300 overflow-hidden mt-5">
        <thead className="bg-neutral-200">
          <tr className="text-neutral-600 text-left border-b border-neutral-500">
            <th className="px-4 py-2 font-semibold text-lg">#</th>
            <th className="px-4 py-2 font-semibold text-lg">
              Product Name
            </th>{" "}
            <th className="px-4 py-2 font-semibold text-lg">Supplier</th>{" "}
            <th className="px-4 py-2 font-semibold text-lg">Brand</th>
            <th className="px-4 py-2 font-semibold text-lg">Cost</th>
            <th className="px-4 py-2 font-semibold text-lg">Price</th>
            <th className="px-4 py-2 font-semibold text-lg">In Stock</th>
            <th className="px-4 py-2 font-semibold text-lg">Published</th>
            <th className="px-4 py-2 font-semibold text-lg">Featured</th>
            <th className="px-4 py-2 font-semibold text-lg">...</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-300">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className="text-neutral-600 text-left hover:bg-slate-200 transition duration-200"
            >
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                {(index + 1)}
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                <p>{product.name}</p>
                <small className="text-xs text-neutral-700">
                  {product.product_code}
                </small>
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                <p>{product.supplier.name}</p>
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                {product.brand.name}
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                <Badge>{formatter(product.cost)}</Badge>
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                <Badge variant="secondary">{formatter(product.price)}</Badge>
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                <Badge
                  className={`${
                    product.in_stock ? "bg-green-600" : "bg-red-500"
                  } text-white`}
                >
                  {product.in_stock ? "In Stock" : "Out Of Stock"}
                </Badge>
              </td>
              <td className="px-4 py-2 font-medium text-md truncate text-clip overflow-hidden ... max-w-[25ch]">
                <Badge
                  className={`${
                    product.published ? "bg-green-600" : "bg-red-500"
                  } text-white`}
                >
                  {product.published ? "Published" : "Draft"}
                </Badge>
              </td>
              <td className="px-4 py-2 font-medium flex items-center justify-center">
                <div
                  className={`${
                    product.featured ? "bg-green-600" : "bg-red-500"
                  } text-white h-10 w-10 rounded-full flex items-center justify-center`}
                >
                  {product.featured ? <CheckCheckIcon /> : <XCircleIcon />}
                </div>
              </td>
              <td className="px-4 py-2 font-medium ">
                <div>
                  <Link href={`/dashboard/products/${product.slug}`}>
                    <EyeIcon />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductsTable;
