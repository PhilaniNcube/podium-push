import { getProducts } from "@/lib/fetchers/products";

const page = async ({
  searchParams: { page = "1" },
}: {
  searchParams: {  page: string };
}) => {
  const productsData = getProducts(+page);

  return <div>page</div>;
};
export default page;
