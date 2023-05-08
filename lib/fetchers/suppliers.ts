import supabaseClient from "../supabase-client"

const getSuppliers = async () => {
  const { data: suppliers, error } = await supabaseClient.from('supplier').select('*')

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return suppliers
}


export default getSuppliers
