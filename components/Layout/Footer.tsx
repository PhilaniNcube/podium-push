import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {

  const date = new Date();
  const year = date.getFullYear();


  return (
    <footer className="mt-8 pb-4">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
          <div className="col-span-1 flex flex-col gap-1">
            <h3 className="text-blue-500 font-semibold text-lg">Podium Push</h3>
            <p className="text-sm md:text-base leading-5 text-neutral-600">
              Shop at Podium Push for a fulfilling ecommerce experience
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full md:w-[70%] lg:w-[50%] mt-1">
              <Link
                href="https://facebook.com"
                className="text-neutral-600 bg-slate-300 rounded-full p-1"
              >
                <Facebook />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-neutral-600 bg-slate-300 rounded-full p-1"
              >
                <Twitter />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-neutral-600 bg-slate-300 rounded-full p-1"
              >
                <Linkedin />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-neutral-600 bg-slate-300 rounded-full p-1"
              >
                <Instagram />
              </Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row md:justify-between md:items-start md:flex-wrap gap-2">
            <div className="flex flex-col">
              <h4 className="text-neutral-800 font-bold text-md mb-2">About</h4>
              <Link
                href="/about"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                About Us
              </Link>
              <Link
                href="/location"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Find Store
              </Link>
              <Link
                href="/categories"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Categories
              </Link>
              <Link
                href="/blog"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Blog
              </Link>
            </div>
            <div className="flex flex-col">
              <h4 className="text-neutral-800 font-bold text-md mb-2">
                Partnerships
              </h4>
              <Link
                href="/customer-service"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Customer Service
              </Link>
              <Link
                href="/custom-design"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Custom Design
              </Link>
              <Link
                href="/school-partnerships"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                School Memorabilia
              </Link>
              <Link
                href="/corporate"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Corporate Attire
              </Link>
            </div>
            <div className="flex flex-col">
              <h4 className="text-neutral-800 font-bold text-md mb-2">
                Information
              </h4>
              <Link
                href="/help-center"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Help Center
              </Link>
              <Link
                href="/refund"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Refund Policy
              </Link>
              <Link
                href="/terms"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-col">
              <h4 className="text-neutral-800 font-bold text-md mb-2">Users</h4>
              <Link
                href="/login"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Register
              </Link>
              <Link
                href="/profile"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                Profile
              </Link>
              <Link
                href="/orders"
                className="text-neutral-500 font-medium hover:text-neutral-600"
              >
                My Orders
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="text-neutral-800 font-bold text-md mb-2">Payment Methods</h4>
            <div className="flex items-center space-x-3 w-full">
              <Image src="/images/logos/credit-card.svg" width={93} height={19} alt="Logos" />
              <Image src="/images/logos/instantEFT.svg" width={88} height={29} alt="Eft" />
            </div>
          </div>
        </div>

      </Container>
      <div className="bg-slate-300 py-3">
        <Container>
          <div className="w-full flex justify-between items-center">
            <p className="text-neutral-600 text-sm md:text-base">Copyright &copy;{year}</p>
            <Link href="https://athenamedia.co.za" className="text-neutral-700 font-semibold text-lg">Designed by Athena Media</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
