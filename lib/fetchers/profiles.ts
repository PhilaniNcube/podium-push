import supabaseServer from "@/utils/supabase-server"
import supabaseClient from "../supabase-client"

const session = async () => {
  const { data, error } = await supabaseClient.auth.getSession()
  if(error) {
    console.log(error)
    throw Error(error.message)
  }
  return data
}

const getProfile = async () => {
  const {data, error} = await supabaseClient.from("profiles").select("*").single()

  if(error) {
    console.log(error)
    throw Error(error.message)
  } else {
    return data
  }
}

export { getProfile }


export default session
