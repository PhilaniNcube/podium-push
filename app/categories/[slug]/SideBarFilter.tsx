import { Database } from "@/schema";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

type SideBarFilterProps = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  brands: Database["public"]["Tables"]["brands"]["Row"][];
}

const SideBarFilter = ({categories, brands}: SideBarFilterProps) => {
  return (
    <aside className="w-[300px] px-2 py-3 border border-neutral-200 rounded-md">
      <div>
        <h3 className="text-lg font-semibold text-neutral-700">Categories</h3>
        <Separator className="my-2" />
        <ScrollArea className="h-72 w-full text-md flex flex-col font-medium text-neutral-400">
          {categories.map((category) => (
            <div
              className="my-1 text-sm transition duration-150 hover:bg-slate-200 px-2 py-1 rounded"
              key={category.id}
            >
              {/* <Link href={`/categories/${category.slug}`}>{category.name}</Link> */}
              <Link
                href={{
                  pathname: `/categories/${category.slug}`,
                }}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </ScrollArea>
        <h3 className="text-lg font-semibold text-neutral-700 mt-4">Brands</h3>
        <Separator className="my-2" />
        <ScrollArea className="h-72 w-full text-md flex flex-col font-medium text-neutral-400">
          {brands.map((brand) => (
            <div
              className="my-1 text-sm transition duration-150 hover:bg-slate-200 px-2 py-1 rounded"
              key={brand.id}
            >
              <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
            </div>
          ))}
        </ScrollArea>
      </div>
    </aside>
  );
};
export default SideBarFilter;
