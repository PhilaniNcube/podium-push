import supabaseClient from "../supabase-client"

const session = async () => {
  const { data, error } = await supabaseClient.auth.getSession()
  if(error) {
    console.log(error)
    throw Error(error.message)
  }
  return data
}


export default session
