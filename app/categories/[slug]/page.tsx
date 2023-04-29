import Container from "@/components/Layout/Container";
import { getProductsByCategory, getProductsBySubCategory } from "@/lib/fetchers/products";
import BreadCrumbs from "./BreadCrumbs";
import getCategories, { getCategory, getSubCategoryBySlug } from "@/lib/fetchers/categories";
import SideBarFilter from "./SideBarFilter";
import getBrands from "@/lib/fetchers/brands";
import ProductsGrid from "@/components/Products/ProductsGrid";


const revalidate = 0;

const page = async ({
  params,
  searchParams: { sub_category = "", page = "1" },
}: {
  searchParams: { sub_category: string; page: string };
  params: { slug: string };
}) => {

// const subCategoryData = getSubCategoryBySlug(sub_category);

const categoryData = getCategory(params.slug)

const brandsData = getBrands();

const categoriesData = getCategories();

const productsData = getProductsByCategory(+page, params.slug);

const [products, category, brands, categories] = await Promise.all([
  productsData,
  categoryData,
  brandsData,
  categoriesData,
]);

console.log(products)


  return (
    <main>
      <Container>
        <BreadCrumbs category={category} />
        <div className="flex space-x-2">
          <SideBarFilter brands={brands} categories={categories} />
          <div className="w-full">
            <div className="flex border border-neutral-400 rounded-md py-2 px-3">
              <span className="text-lg text-neutral-600 font-medium">
                {products.length}{" "}
                <span className="font-normal">items in {category.name}</span>
              </span>
            </div>
            <ProductsGrid products={products} />
          </div>
        </div>
      </Container>
    </main>
  );
};
export default page;
