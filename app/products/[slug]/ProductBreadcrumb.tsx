import { Database } from "@/schema";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type BreadcrumbProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductBreadcrumb = ({ product }: BreadcrumbProps) => {
  return (
    <span className="flex items-center space-x-4 text-neutral-500 font-medium py-2">
      <Link href="/" className="hover:text-blue-500">
        Home
      </Link>
      <ChevronRightIcon />
      <Link href="/categories" className="hover:text-blue-500">
        Categories
      </Link>
      <ChevronRightIcon />
      <Link
        href={`/categories/${product.category.slug}`}
        className="hover:text-blue-500"
      >
        {product.category.name}
      </Link>
      <ChevronRightIcon />
      <p

        className="hover:text-blue-500"
      >
        {product.name}
      </p>
    </span>
  );
};
export default ProductBreadcrumb;
