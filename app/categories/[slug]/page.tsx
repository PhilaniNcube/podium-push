import Container from "@/components/Layout/Container";
import { getCategoryProductsCount, getProductsByCategory, getProductsBySubCategory, getTotalProductsCount } from "@/lib/fetchers/products";
import BreadCrumbs from "./BreadCrumbs";
import getCategories, { getCategory } from "@/lib/fetchers/categories";
import SideBarFilter from "./SideBarFilter";
import getBrands from "@/lib/fetchers/brands";
import ProductsGrid from "@/components/Products/ProductsGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const revalidate = 0;

const page = async ({
  params,
  searchParams: { sub_category = "", page = "1" },
}: {
  searchParams: { sub_category: string; page: string };
  params: { slug: string };
}) => {

const countData = getCategoryProductsCount(params.slug);

const categoryData = getCategory(params.slug)

const brandsData = getBrands();

const categoriesData = getCategories();

const productsData = getProductsByCategory(+page, params.slug);

const [products, category, brands, categories, count] = await Promise.all([
  productsData,
  categoryData,
  brandsData,
  categoriesData,
  countData
]);



const pages = Math.ceil(count/15)

console.log({count, pages})



  return (
    <main>
      <Container>
        <BreadCrumbs category={category} />
        <div className="flex space-x-2">
          <SideBarFilter brands={brands} categories={categories} />
          <div className="w-full">
            <div className="flex border border-neutral-400 rounded-md py-2 px-3">
              <span className="text-lg text-neutral-600 font-medium">
                {count}{" "}
                <span className="font-normal">items in {category.name}</span>
              </span>
            </div>
            <ProductsGrid products={products} />
            <div className="flex w-full items-center justify-between">
              {+page > 1 ? (
                <Link
                  href={`/categories/${category.slug}?page=${+page - 1}`}
                  className="border border-neutral-300 px-4 py-2 text-lg hover:border-neutral-300 text-neutral-700 font-medium rounded-md"
                >
                  {" "}
                  Prev Page
                </Link>
              ) : (
                <Button variant="ghost" disabled>
                  Prev Page
                </Button>
              )}
              {+page !== pages && pages > 1 ? (
                <Link
                  href={`/categories/${category.slug}?page=${+page + 1}`}
                  className="border border-neutral-300 px-4 py-2 text-lg hover:border-neutral-300 text-neutral-700 font-medium rounded-md"
                >
                  Next Page
                </Link>
              ) : (
                <Button variant="ghost" disabled>
                  Next Page
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
export default page;
