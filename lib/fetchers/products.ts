import supabaseClient from "../supabase-client"

//create a function to return products from supabase with pagination return 16 products per page
const getProducts = async (page=1) => {

  let start = (page - 1) * 16
  let end = (page * 16) - 1

  const { data: products, error } = await supabaseClient.from('products').select('*, category(*), brand(*), sub_category(*), supplier(*)')
    .limit(16).range(start, end)

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return products
}

const getFeaturedProducts = async () => {

  const { data: products, error } = await supabaseClient.from('products').select('*, category(*), brand(*), sub_category(*), supplier(*)').eq('featured', true)


    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return products
}


const getProductsByCategory = async (page: number, slug:string) => {

  const {data, error: categoryError} = await supabaseClient.from("categories").select("id").eq("slug", slug).single()

  console.log({categoryError, data})

  let start = (page - 1) * 5
  let end = (page * 5) - 1

  console.log({start, end})

  const { data: products, error } = await supabaseClient.from('products').select('*, category(*), brand(*), sub_category(*), supplier(*)').eq('category', data?.id).range(start, end)

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return products
}


const getProductsByCategoryCount = async (count: number, categoryId:string) => {

  const { data: products, error } = await supabaseClient.from('products').select('*, category(*), brand(*), sub_category(*), supplier(*)').limit(count).eq('category', categoryId)

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return products
}


const getProductsBySubCategory = async (page: number, sub_category:string) => {

  let start = (page - 1) * 16
  let end = page * 16

  console.log({sub_category})

  const { data: products, error } = await supabaseClient.from('products').select('*, category(*), brand(*), sub_category(*), supplier(*)')
    .range(start, end).eq('sub_category.slug', sub_category)

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return products
}

const getProductsByBrand = async (page: number, brand:string) => {

  let start = (page - 1) * 16
  let end = page * 16

  const { data: products, error } = await supabaseClient.from('products').select('*, category(*), brand(*), sub_category(*), supplier(*)')
    .limit(16).range(start, end).eq('brand', brand)

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return products
}

const getProduct = async ( product:string) => {

  const { data, error } = await supabaseClient.from('products')
  .select('*, category(*), brand(*), sub_category(*), supplier(*)').eq('slug', product).single()

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return data
}

export { getProducts, getProductsByCategory, getProductsBySubCategory, getProductsByBrand, getFeaturedProducts, getProduct, getProductsByCategoryCount}
