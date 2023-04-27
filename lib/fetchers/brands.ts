import supabaseClient from "../supabase-client"

const getBrands = async () => {
  const { data: brands, error } = await supabaseClient.from('brands').select('*')

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return brands
}

const getBrand = async (slug:string) => {
  const { data: brand, error } = await supabaseClient.from('brands').select('*').eq('slug', slug).single()

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return brand
}


export default getBrands
export { getBrand }
