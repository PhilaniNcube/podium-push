import formatter from "@/lib/formatter";
import { Database } from "@/schema";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Button } from "../ui/button";

type ProductListItemProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
}

const ProductListItem = ({product}:ProductListItemProps) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="border border-neutral-300 overflow-hidden group rounded-md mb-4 px-4 py-6 flex flex-col lg:flex-row lg:justify-between group-hover:bg-slate-200 gap-4"
    >
      <Image
        src={product.images[0].url}
        width={product.images[0].width}
        height={product.images[0].height}
        alt={product.name}
        className="w-[200px] aspect-square object-cover "
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-neutral-700">
          {product.name}
        </h3>
        <p className="text-neutral-900 font-medium text-xl mt-1">
          {formatter(product.price)}
        </p>
        <div className="flex justify-start space-x-2 items-center">
          <span className="text-blue-500 font-medium text-sm">
            Category: {product.category.name} /{" "}
          </span>
          <span className="text-teal-400 font-medium text-sm">
            {product.sub_category.name}{" "}
          </span>
        </div>
        <Separator className="my-2" />
        <p className="text-sm text-neutral-600 mt-1 line-clamp-3">
          {product.description}
        </p>
        <p className="text-xs text-neutral-500">Warranty: {product.warranty}</p>
        <Button variant="ghost" className="mt-4 text-blue-600 hover:text-blue-700 transition duration-150 font-medium text-sm">View Details</Button>
      </div>
    </Link>
  );
};
export default ProductListItem;
