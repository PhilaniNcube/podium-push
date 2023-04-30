import Container from "@/components/Layout/Container";
import { getProduct, getSimilarProducts } from "@/lib/fetchers/products";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductDetails from "./ProductDetails";
import SimilarProducts from "@/components/Products/SimilarProducts";

const page = async ({params:{slug}}:{params:{slug:string}}) => {

  const productData = getProduct(slug);

  const [product] = await Promise.all([productData])

  const similarProducts = await getSimilarProducts(product.sub_category.id)

  return (
  <main>
    <Container>
      <ProductBreadcrumb product={product} />
      <ProductDetails product={product} />
      <SimilarProducts products={similarProducts} />
    </Container>
  </main>
    )
};
export default page;
