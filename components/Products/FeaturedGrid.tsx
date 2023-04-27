import { Database } from "@/schema";
import Container from "../Layout/Container";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type FeaturedGridProps = {
  products: Database['public']['Tables']['products']['Row'][]
}

const FeaturedGrid = ({ products }: FeaturedGridProps) => {
  return (
    <section className="my-8">
      <Container>
        <div className="border border-neutral-300 rounded w-full grid grid-cols-6">
          <div className="border-r border-neutral-300 px-4 py-2 col-span-1 flex flex-col justify-center">
            <h3 className="text-neutral-700 font-medium text-md lg:text-2xl">
              Deals and offers
            </h3>
            <p className="text-md text-neutral-400">
              Best prices and quality
            </p>
          </div>
          <div className="grid grid-cols-5 col-span-5">
            {products.map((product) => (
              <article
                key={product.id}
                className="last-of-type:border-r-0 border-r border-neutral-300 w-full px-8 py-6 flex flex-col justify-between"
              >
                <Image
                  src={product.images[0].url}
                  width={product.images[0].width}
                  height={product.images[0].height}
                  alt={product.name}
                  className="object-cover w-full"
                />
                <div className="flex justify-center items-center flex-col">
                <p className="text-md font-medium text-neutral-700 text-center">{product.sub_category.name}</p>
                 <Badge className="bg-green-700">Save up to 30%</Badge>
                </div>

              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default FeaturedGrid;
