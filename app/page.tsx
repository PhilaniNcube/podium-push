import ApparelBanner from "@/components/Banners/ApparelBanner";
import HomePage from "@/components/Banners/HomePage";
import Newsletter from "@/components/Leads/Newsletter";
import Computers from "@/components/Products/Computers";
import FeaturedGrid from "@/components/Products/FeaturedGrid";
import HomepageProductGrid from "@/components/Products/HomepageProductGrid";
import LuggageGrid from "@/components/Products/LuggageGrid";
import ExtraServices from "@/components/Services/ExtraServices";
import { getSubCategories } from "@/lib/fetchers/categories";
import { getFeaturedProducts, getProducts, getProductsByCategory, getProductsByCategoryCount } from "@/lib/fetchers/products";

const page = async () => {

   const subCategoriesData = getSubCategories();
   const featuredProductsData = getFeaturedProducts();
    const luggageData = getProductsByCategory(
      1,
      "233faa3f-8fbb-4771-a9fa-f5879afe0cbf"
    );
    const electronicsData = getProductsByCategoryCount(
      10,
      "e691b620-acc1-4de4-831f-65d4a6ab66b0"
    );

  const [subCategories, featuredProducts, luggage,computers] = await Promise.all([
    subCategoriesData,
    featuredProductsData,
    luggageData,
    electronicsData,
  ]);

  // console.log(products)

  return (
    <main className="">
      <HomePage subCategories={subCategories} />
      <FeaturedGrid products={featuredProducts} />
      <LuggageGrid products={luggage} />
      <Computers products={computers} />
      <ApparelBanner />
      {/* @ts-expect-error Async Server Component */}
      <HomepageProductGrid />
      <ExtraServices />
      <Newsletter />
    </main>
  );
};
export default page;
