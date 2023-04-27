import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import { Database } from '@/schema'



// do not cache this page
export const revalidate = 0

export async function GET(req: NextRequest) {

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') || '1'

   let start = (+page - 1) * 16
  let end = +page * 16

  const { data: products, error } = await supabase
    .from('products')
    .select('*, category(*), sub_category(*), supplier(*), brand(*)').range(start, end)

    if(error) {
      return NextResponse.json({message: error.message}, {status: 400})
    }


  return NextResponse.json(products)
}
