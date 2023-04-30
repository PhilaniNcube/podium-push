import SupabaseProvider from "./supabase-provider";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import getCategories, { getSubCategories } from "@/lib/fetchers/categories";
import getBrands from "@/lib/fetchers/brands";
import { getProductsByCategory } from "@/lib/fetchers/products";
import Footer from "@/components/Layout/Footer";
import Providers from "@/components/Providers";


// do not cache this page
// export const revalidate = 0

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {


  const subCategoriesData = getSubCategories();


  const categoriesData = getCategories();
  const brandsData = getBrands();

  const [subCategories, categories, brands ] = await Promise.all([
    subCategoriesData,
    categoriesData,
    brandsData,
      ]);


  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Providers>
            <Header
              categories={categories}
              subCategories={subCategories}
              brands={brands}
            />
            {children}
            <Footer />
          </Providers>
        </SupabaseProvider>
      </body>
    </html>
  );
}
