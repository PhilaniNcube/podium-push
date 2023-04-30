import { Database } from "@/schema";
import TopSection from "./TopSection";

export type ProductProps = {
  product: Database["public"]["Tables"]["products"]["Row"];
};

const ProductDetails = ({ product }: ProductProps) => {
  return (
    <div>
      <TopSection product={product} />
    </div>
  );
};
export default ProductDetails;
