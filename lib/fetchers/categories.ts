import supabaseClient from "../supabase-client"

const getCategories = async () => {
  const { data: categories, error } = await supabaseClient.from('categories').select('*')

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return categories
}

const getSubCategories = async () => {
  const { data: subCategories, error } = await supabaseClient.from('sub_category').select('*, parent(*)')

    if(error) {
      console.log(error)
      throw Error(error.message)
    }
  return subCategories
}


export default getCategories
export { getSubCategories }
