import { Database } from "@/schema";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type BreadcrumbProps = {
  category: Database["public"]["Tables"]["categories"]["Row"];
};

const BreadCrumbs = ({ category }: BreadcrumbProps) => {



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
        href={`/categories/${category.slug}`}
        className="hover:text-blue-500"
      >
        {category.name}
      </Link>
    </span>
  );
};
export default BreadCrumbs;
