"use client"

import Container from "../Layout/Container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Newsletter = () => {
  return <section className="my-10 bg-slate-300">
    <Container>
        <div className="flex flex-col items-center py-10 md:py-16">
          <h3 className="text-lg md:text-2xl font-semibold text-neutral-800">Subscribe to our newsletter</h3>
          <p className="text-neutral-500 font-medium text-sm md:text-base">Get daily and weekly messages on upcoming offers from many international and local brands</p>
          <form className="mt-3 flex justify-center space-x-3">
            <Input type="email" name="email" id="email" className="rounded max-w-md border-2 border-neutral-800" />
            <Button type="submit"  className="border-2 rounded border-neutral-700 bg-neutral-700 shadow text-white hover:bg-neutral-900 hover:shadow-sm transition duration-150">Subscribe</Button>
          </form>
        </div>
    </Container>
  </section>;
};
export default Newsletter;
