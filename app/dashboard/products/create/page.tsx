import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CreateProduct from "./CreateProduct";
import getCategories, { getSubCategories } from "@/lib/fetchers/categories";
import getBrands from "@/lib/fetchers/brands";
import getSuppliers from "@/lib/fetchers/suppliers";



const page = async () => {

  const categoriesData = await getCategories();
  const subCategoriesData = await getSubCategories();
  const brandsData = await getBrands();
  const suppliersData = await getSuppliers();

  const [categories, subCategories, brands, suppliers] = await Promise.all([categoriesData, subCategoriesData, brandsData, suppliersData])


  return (
    <div className="w-full">
      <h1 className="text-neutral-700 font-semibold text-3xl">
        Create Product
      </h1>
      <CreateProduct categories={categories} subCategories={subCategories} brands={brands} suppliers={suppliers} />
    </div>
  );
};
export default page;
