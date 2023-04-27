"use client"

import Container from "../Layout/Container";
import SectionTitle from "../Typograpghy/SectionTitle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ApparelBanner = () => {
  return (
    <section className="my-10">
      <Container>
        <div className="bg-gradient-to-r from-blue-500/90 to-teal-300/30 w-full rounded-md overflow-hidden px-8 py-10 relative flex justify-between items-start gap-8">
          <div className="w-full md:w-1/2">
            <SectionTitle title="An easy way to show your love for your alma mater" />
          </div>
          <div className="bg-white flex-1 rounded-md px-4 py-4 shadow-lg">
            <h3 className="text-neutral-700 font-medium text-lg">
              Do you want a quote of custom apparel?
            </h3>

            <form>
              {" "}
              <div className="mt-3">
                <Label htmlFor="organisation" className="text-neutral-600 py-2">
                  What organisation/school do you want custom apparel for?
                </Label>
                <Input
                  placeholder="Organisation/School"
                  id="organisation"
                  name="organisation"
                  type="text"
                  required
                  className="max-w-xl border-2 border-neutral-400"
                />
              </div>
              <div className="mt-3">
                <Label htmlFor="message" className="text-neutral-600 py-2">
                  Message
                </Label>
                <Textarea
                  placeholder="Type your message here"
                  id="organisation"
                  name="organisation"
                  required
                  className="max-w-xl border-2 border-neutral-400"
                />
              </div>
              <div className="mt-3">
                <Button variant="default" className="w-full max-w-xl">Save</Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default ApparelBanner;
