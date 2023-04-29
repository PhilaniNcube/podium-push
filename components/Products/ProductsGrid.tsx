import { Database } from "@/schema";
import ProductListItem from "./ProductListItem";
import { ScrollArea } from "../ui/scroll-area";

type ProductsGridProps = {
  products: Database['public']['Tables']['products']['Row'][];
}

const ProductsGrid = ({products}:ProductsGridProps) => {
  return (
    <div className="max-h-screen w-full overflow-hidden mt-4">
      <ScrollArea className="h-screen">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ScrollArea>
    </div>
  );
};
export default ProductsGrid;
