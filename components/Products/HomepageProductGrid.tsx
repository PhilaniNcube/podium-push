import { getFeaturedProducts } from "@/lib/fetchers/products";
import Container from "../Layout/Container";
import Image from "next/image";
import Link from "next/link";
import formatter from "@/lib/formatter";

const HomepageProductGrid = async () => {

  const products = await getFeaturedProducts();

  return (
          <section className="my-10">
            <Container>
              <h2 className="text-neutral-700 font-semibold text-2xl md:text-3xl">Featured Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10 mt-3">
                {products.map((product) => (
                  <Link href={`/products/${product.slug}`} key={product.id} className="rounded-md shadow-sm hover:shadow-md transition duration-200 shadow-neutral-300 p-3 group">
                    <Image src={product.images[0].url} width={400} height={400} alt={product.name} className="w-full aspect-square object-cover group-hover:bg-slate-200/20" />
                    <div className="mt-2">
                      <p className="text-neutral-800 text-xl font-bold">{formatter(product.price)}</p>
                      <h4 className="text-lg mt-1 text-neutral-500 font-medium">{product.name}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
          )
};
export default HomepageProductGrid;
