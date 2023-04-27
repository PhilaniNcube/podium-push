import Image from "next/image";
import Container from "../Layout/Container";

const services = [
  {
    id: 1,
    name: "Deliveries to anywhere in South Africa",
    image: "/images/home/deliveries.jpg",
  },
  {
    id: 2,
    name: "Internationally recognized brands",
    image: "/images/home/iphone.jpg",
  },
  {
    id: 3,
    name: "Convinient payment methods",
    image: "/images/home/shopping.jpg",
  },
  {
    id: 4,
    name: "Custom sports apparel",
    image: "/images/home/sports.jpg",
  },
];

const ExtraServices = () => {
  return (
    <section className="my-10">
      <Container>
        <h2 className="text-neutral-700 font-semibold text-2xl md:text-3xl mb-3">
          Extra Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 md:gap-12 lg:gap-8 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="relative isolate w-full rounded-md border border-neutral-200 overflow-hidden">
              <Image src={service.image} width={1920} height={1280} alt={service.name} className="w-full aspect-video object-cover" />
              <div className="py-4 px-3">
                <p className="text-neutral-600 text-md md:text-lg font-semibold w-[22ch]">{service.name}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
export default ExtraServices;
