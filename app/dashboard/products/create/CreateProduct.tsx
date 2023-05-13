"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/supabase-provider";
import {CldUploadButton, CldUploadWidget} from "next-cloudinary"
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Trash2Icon } from "lucide-react";
import createProduct from "@/lib/actions/productActions";
import supabaseClient from "@/lib/supabase-client";
import { revalidatePath } from "next/cache";
// import { v4 as uuidv4 } from "uuid";
import {v4 as uuidv4} from "uuid"


export type Info = {
  access_mode: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  id: string;
  original_filename: string;
  path: string;
  placeholder: false;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: any[];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

export type Result = {
  event: string;
  info: Info;
};

const createProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" }),
  product_code: z
    .string()
    .min(3, { message: "Product code must be at least 3 characters long" }),
  description: z.string().min(3, {
    message: "Product description must be at least 3 characters long",
  }),
  category: z.string().uuid().optional(),
  sub_category: z.string().uuid().optional(),
  brand: z.string().uuid().optional(),
  supplier: z.string().uuid().optional(),
  details: z
    .object({
      key: z.string(),
      value: z.string(),
    })
    .array(),
  // refund_policy: z.enum(["7 days", "14 days", "30 days"]),
  // warranty: z.enum(["6 Months", "1 Year", "2 Years", "3 Years"]),
  price: z.string(),
  cost: z.string(),
  in_stock: z.boolean({ description: "In Stock" }).default(false),
  featured: z.boolean({ description: "Featured" }).default(false),
  published: z.boolean({ description: "Published" }).default(false),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

type Props = {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  subCategories: Database["public"]["Tables"]["sub_category"]["Row"][];
  brands: Database["public"]["Tables"]["brands"]["Row"][];
  suppliers: Database["public"]["Tables"]["supplier"]["Row"][];
}

const CreateProduct = ({categories, brands, subCategories, suppliers}:Props) => {

    const { supabase } = useSupabase();
    const router = useRouter();

    const [details, setDetails] = useState([{
      key: "Colour",
      value: "Black"
    }])

    const [images, setImages] = useState<{url:string, height:number, width:number}[]>([])

    console.log(images)

        const {
          register,
          control,
          handleSubmit,
          formState: { errors },
        } = useForm<CreateProductSchema>({
          resolver: zodResolver(createProductSchema),
          defaultValues: {
            name: "",
            product_code: "",
            description: "",
            category: "",
            sub_category: "",
            brand: "",
            supplier: "",
            details: [
              {
                key: "Colour",
                value: "Black"
              }
            ],

            price: "0",
            cost: "0",
            in_stock: false,
            featured: false,
            published: false,
          }
        })

        const { fields, append, remove } = useFieldArray({
          control,
          name: "details",
        });



        const onSubmit = async (data: CreateProductSchema) => {


            if (
              typeof data.name !== "string" ||
              typeof data.product_code !== "string" ||
              typeof data.description !== "string" ||
              typeof data.price !== "string" ||
              typeof data.cost !== "string" ||
              typeof data.in_stock !== "boolean" ||
              typeof data.featured !== "boolean" ||
              typeof data.published !== "boolean" ||
              typeof data.brand !== "string" ||
              typeof data.category !== "string" ||
              typeof data.sub_category !== "string" ||
              typeof data.supplier !== "string" ||
              typeof data.details === "undefined" ||
              typeof data.details === null
            ) {
              throw new Error("Invalid data type");
            }

          console.log(data);

          const slug = data.name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "_");


            const { data: products, error } = await supabase
              .from("products")
              .insert({
                name: data.name,
                product_code: data.product_code,
                description: data.description,
                price: +data.price,
                cost: +data.cost,
                in_stock: data.in_stock,
                featured: data.featured,
                published: data.published,
                details: data.details,
                brand: data.brand,
                category: data.category,
                sub_category: data.sub_category,
                supplier: data.supplier,
                refund_policy: "7 days",
                warranty: "6 Months",
                slug: slug,
                images: images
              });

              console.log({products, error})

              revalidatePath('/products')

        }


        const upLoadImage = async (e:ChangeEvent<HTMLInputElement>) => {

          const IMAGE_URL =
            "https://qoqdvqfsvvzrlxuasgks.supabase.co/storage/v1/object/public/products/";

          if(e.target.files && e.target.files.length > 0) {
            let files = e.target.files;

            let objects = [];

            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              console.log({file})
              const { data, error }:{data:any, error:any} = await supabase.storage.from("products").upload(`products/${uuidv4()}_${file.name}`, file)

              if(error) {
                console.log({error})
                throw new Error("Error uploading image")
              } else {
               console.log({data})
               objects.push({
                  url: `${IMAGE_URL}${data.path}`,
                  height: 800,
                  width: 800,
               })
              }
            }

            setImages(objects)
            console.log(objects)

          }



          console.log(images);
        }


          async function handleOnUpload(result: Result, widget: any) {
            console.log({ result, widget });
            if (result.event === "success") {
              setImages([
                ...images,
                {
                  url: result.info.secure_url,
                  height: result.info.height,
                  width: result.info.width,
                },
              ]);
              widget.close();
              return;
            } else if (result.event !== "success") {
              console.log({result})
              widget.close();
            }
          }



  return (
    <div className="w-full mt-4">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-3/4 mt-4 border border-neutral-300 bg-neutral-100 py-4 px-3 rounded-md"
      >
        <div className="w-full lg:w-2/3 flex flex-col  space-y-3 relative">
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Enter product name"
            className="border border-neutral-300 bg-white"
          />
          {errors.name && (
            <p className="text-xs text-red-600 ">
              {errors.name.message} for name
            </p>
          )}
        </div>
        <div className="w-full lg:w-2/3 flex flex-col  space-y-3 mt-4 relative">
          <Label htmlFor="product_code">Product Code/SKU</Label>
          <Input
            type="text"
            id="product_code"
            {...register("product_code")}
            placeholder="Enter product code/sku"
            className="border border-neutral-300 bg-white"
          />{" "}
          {errors.product_code && (
            <p className="text-xs text-red-600 ">
              {errors.product_code.message} for product code
            </p>
          )}
        </div>
        <div className="w-full lg:w-2/3 flex flex-col  space-y-3 mt-4 relative">
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter product description"
            className="border border-neutral-300 bg-white"
          ></Textarea>
          {errors.description && (
            <p className="text-xs text-red-600 ">
              {errors.description.message} for description
            </p>
          )}
        </div>
        <div className="flex lg:w-2/3 items-center justify-start space-x-6 relative">
          <div className=" flex flex-col  space-y-3 mt-4">
            <Label htmlFor="price">Product price</Label>
            <Input
              type="number"
              id="price"
              {...register("price")}
              placeholder="Enter product price"
              className="border border-neutral-300 bg-white"
            />{" "}
            {errors.price && (
              <p className="text-xs text-red-600 ">
                {errors.price.message} for price
              </p>
            )}
          </div>{" "}
          <div className=" flex flex-col  space-y-3 mt-4 relative">
            <Label htmlFor="cost">Cost</Label>
            <Input
              type="number"
              id="cost"
              {...register("cost")}
              placeholder="Enter product cost"
              className="border border-neutral-300 bg-white"
            />{" "}
            {errors.cost && (
              <p className="text-xs text-red-600 ">
                {errors.cost.message} for cost
              </p>
            )}
          </div>
        </div>

        <div className="flex lg:space-x-5 my-8 relative">
          {" "}
          <div className=" flex items-center space-x-2 ">
            <Switch id="in_stock" {...register("in_stock")} />
            <Label htmlFor="in_stock">In Stock</Label>

            {errors.in_stock && (
              <p className="text-xs text-red-600 ">
                {errors.in_stock.message} for in stock
              </p>
            )}
          </div>{" "}
          <div className=" flex items-center space-x-2 ">
            <Switch id="featured" {...register("featured")} />
            <Label htmlFor="featured">Featured</Label>

            {errors.featured && (
              <p className="text-xs text-red-600 ">
                {errors.featured.message} for featured
              </p>
            )}
          </div>
          <div className=" flex items-center space-x-2 ">
            <Switch id="published" {...register("published")} />
            <Label htmlFor="published">Published</Label>

            {errors.published && (
              <p className="text-xs text-red-600 ">
                {errors.published.message} for published
              </p>
            )}
          </div>
        </div>

        <Separator className="mt-2 text-neutral-700 border border-neutral-300" />

        <div className="w-full lg:w-2/3 flex flex-col space-y-3 my-4">
          <h3 className="my-3 text-neutral-800 font-medium">
            Add Product Attributes
          </h3>

          <Label htmlFor="details">Product Details</Label>
          <div className="flex flex-col space-y-3 ">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-center space-x-4">
                  <Input
                    type="text"
                    {...register(`details.${index}.key`)}
                    placeholder="Enter detail name e.g. Colour"
                    className="border border-neutral-300 bg-white"
                  />
                  <Input
                    type="text"
                    {...register(`details.${index}.value`)}
                    placeholder="Enter detail value e.g. Black"
                    className="border border-neutral-300 bg-white"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="flex space-x-2"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
            {errors.details && (
              <p className="text-xs text-red-600 ">
                {errors.details.message} for details
              </p>
            )}
            <Button
              type="button"
              onClick={() => append({ key: "", value: "" })}
              className="mt-4 w-fit px-4"
            >
              Add Detail
            </Button>
          </div>
        </div>

        <Separator className="mt-2 text-neutral-700 border border-neutral-300" />

        <RadioGroup className="my-3 relative" {...register("brand")}>
          <Label className="text-lg">Select A Brand</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("brand")}
                  id={brand.id}
                  value={brand.id}
                />
                <Label htmlFor={brand.id}>{brand.name}</Label>
              </div>
            ))}
          </div>
          {errors.brand && (
            <p className="text-xs text-red-600 ">
              {errors.brand.message} for brand
            </p>
          )}
        </RadioGroup>

        <Separator className="mt-2 text-neutral-700 border border-neutral-300" />

        <RadioGroup className="my-3 relative" {...register("category")}>
          <Label className="text-lg">Select A Category</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("category")}
                  id={category.id}
                  value={category.id}
                  key={category.id}
                />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </div>
          {errors.category && (
            <p className="text-xs text-red-600 ">
              {errors.category.message} for category
            </p>
          )}
        </RadioGroup>

        <Separator className="mt-2 text-neutral-700 border border-neutral-300" />

        <RadioGroup className="my-3 relative" {...register("sub_category")}>
          <Label className="text-lg">Select A Sub Category</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("sub_category")}
                  id={category.id}
                  value={category.id}
                />
                <Label htmlFor={category.id}>{category.name}</Label>
              </div>
            ))}
          </div>
          {errors.sub_category && (
            <p className="text-xs text-red-600 ">
              {errors.sub_category.message} for sub category
            </p>
          )}
        </RadioGroup>
        <Separator className="mt-2 text-neutral-700 border border-neutral-300" />

        <RadioGroup className="my-3 relative" {...register("supplier")}>
          <Label className="text-lg">Select A Supplier</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...register("supplier")}
                  id={supplier.id}
                  value={supplier.id}
                />
                <Label htmlFor={supplier.id}>{supplier.name}</Label>
              </div>
            ))}
          </div>
          {errors.supplier && (
            <p className="text-xs text-red-600 ">
              {errors.supplier.message} for supplier
            </p>
          )}
        </RadioGroup>

        <Separator className="mt-8 text-neutral-400 border border-neutral-500" />

        <div className="w-full">
          <h3 className="text-lg text-neutral-800 font-medium">
            Upload Images
          </h3>
          <div className=" text-white text-sm font-medium w-fit px-4 py-2 rounded-md">
            <Label htmlFor="images">Image</Label>
            <Input type="file" multiple onChange={upLoadImage} className="text-neutral-400 w-full" accept="images/*" />
          </div>
        </div>

        <Separator className="mt-8 text-neutral-400 border border-neutral-500" />

        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default CreateProduct;
