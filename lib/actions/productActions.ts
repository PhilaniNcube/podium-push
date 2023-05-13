"use server"

import { Database } from "@/schema";
import supabaseClient from "../supabase-client";
import { revalidatePath } from "next/cache";

type Details = {
  key: string
  value: string
}[]

type ProductData = Database["public"]["Tables"]["products"]["Insert"]

const createProduct = async (data:FormData) => {

  const name = data.get('name');
  const product_code = data.get('product_code');
  const description = data.get('description');
  const price = data.get('price');
  const cost = data.get('cost');
  const in_stock = data.get('in_stock');
  const featured = data.get('featured');
  const published = data.get('published');
  const details = data.get('details');
  const brand = data.get('brand');
  const category = data.get('category');
  const sub_category = data.get('sub_category');
  const supplier = data.get('supplier');


  if(typeof name !== 'string' || typeof product_code !== 'string' || typeof description !== 'string' || typeof price !== 'string' || typeof cost !== 'string' || typeof in_stock !== 'boolean' || typeof featured !== 'boolean' || typeof published !== 'boolean' || typeof brand !== 'string' || typeof category !== 'string' || typeof sub_category !== 'string' || typeof supplier !== 'string' || typeof details === 'undefined' || typeof details !== null) {
    throw new Error('Invalid data type');
  }

  const {data:products, error } = await supabaseClient.from("products").insert({
    "name": name,
    "product_code": product_code,
    "description": description,
    "price": +price,
    "cost": +cost,
    "in_stock": in_stock,
    "featured": featured,
    "published": published,
    "details": details as any,
    "brand": brand,
    "category": category,
    "sub_category": sub_category,
    "supplier": supplier
  })

  console.log({products, error})


  revalidatePath('/products')
  revalidatePath('dashboard/products')

}


export default createProduct


const uploadProductImage = () => {

}
