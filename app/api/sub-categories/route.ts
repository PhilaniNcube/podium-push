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

  const { data: sub_categories, error } = await supabase
    .from('sub_category')
    .select('*')

    if(error) {
      return NextResponse.json({message: error.message}, {status: 400})
    }


  return NextResponse.json(sub_categories)
}
