"use client"
import { CldUploadButton } from "next-cloudinary";
import { Result } from "../create/CreateProduct";

const page = async ({params: {slug}}:{params: {slug: string}}) => {


          async function handleOnUpload(result: Result, widget: any) {
            console.log({ result, widget });
            if (result.event === "success") {

              widget.close();
              return;
            } else if (result.event !== "success") {
              console.log({ result });
              widget.close();
            }
          }

  return (
    <div>
      {slug}
      <div className="bg-blue-400 text-white text-sm font-medium w-fit px-4 py-2 rounded-md">
        <CldUploadButton onUpload={handleOnUpload} uploadPreset="podium_push">
          Select Image
        </CldUploadButton>
      </div>
    </div>
  );
};
export default page;
