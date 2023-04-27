export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]


export type ImageType = {
  url: string,
  width: number,
  height: number,
}

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
        }
      }
      brands: {
        Row: {
          name: string | null
          slug: string | null
          image: ImageType | null
          id: string
          created_at: string | null
        }
        Insert: {
          name?: string | null
          slug?: string | null
          image?: ImageType
          id?: string
          created_at?: string | null
        }
        Update: {
          name?: string | null
          slug?: string | null
          image?: ImageType
          id?: string
          created_at?: string | null
        }
      }
      categories: {
        Row: {
          name: string | null
          slug: string | null
          image: ImageType | null
          id: string
          created_at: string | null
        }
        Insert: {
          name?: string | null
          slug?: string | null
          image?: ImageType
          id?: string
          created_at?: string | null
        }
        Update: {
          name?: string | null
          slug?: string | null
          image?: ImageType
          id?: string
          created_at?: string | null
        }
      }
      product_images: {
        Row: {
          product_id: string | null
          image_url: string | null
          id: string
          created_at: string | null
        }
        Insert: {
          product_id?: string | null
          image_url?: string | null
          id?: string
          created_at?: string | null
        }
        Update: {
          product_id?: string | null
          image_url?: string | null
          id?: string
          created_at?: string | null
        }
      }
      products: {
        Row: {
          brand: Database["public"]["Tables"]["brands"]["Row"]
          category: Database["public"]["Tables"]["categories"]["Row"]
          details: Json | null
          sub_category: Database["public"]["Tables"]["sub_category"]["Row"]
          images: ImageType[]
          supplier: Database["public"]["Tables"]["supplier"]["Row"]
          id: string
          created_at: string
          name: string
          description: string
          slug: string
          refund_policy: string
          rating: number
          shipping: number
          price: number
          cost: number
          featured: boolean
          in_stock: boolean
          published: boolean
          warranty: string
          product_code: string
        }
        Insert: {
          brand?: string | null
          category?: string | null
          details?: Json | null
          sub_category?: string | null
          images?: ImageType[]
          supplier?: string | null
          id?: string
          created_at?: string | null
          name?: string | null
          description?: string | null
          slug?: string | null
          refund_policy?: string | null
          rating?: number | null
          shipping?: number | null
          price?: number | null
          cost?: number | null
          featured?: boolean | null
          in_stock?: boolean | null
          published?: boolean | null
          warranty?: string | null
          product_code?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          details?: Json | null
          sub_category?: string | null
          images?: ImageType[]
          supplier?: string | null
          id?: string
          created_at?: string | null
          name?: string | null
          description?: string | null
          slug?: string | null
          refund_policy?: string | null
          rating?: number | null
          shipping?: number | null
          price?: number | null
          cost?: number | null
          featured?: boolean | null
          in_stock?: boolean | null
          published?: boolean | null
          warranty?: string | null
          product_code?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          first_name: string | null
          last_name: string | null
          created_at: string | null
          role: Database["public"]["Tables"]["roles"]
          image: string | null
          address: Json | null
        }
        Insert: {
          id: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          created_at?: string | null
          role?: string | null
          image?: string | null
          address?: Json | null
        }
        Update: {
          id?: string
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          created_at?: string | null
          role?: string | null
          image?: string | null
          address?: Json | null
        }
      }
      roles: {
        Row: {
          role: string | null
          id: string
        }
        Insert: {
          role?: string | null
          id?: string
        }
        Update: {
          role?: string | null
          id?: string
        }
      }
      sub_category: {
        Row: {
          name: string | null
          slug: string | null
          parent: Database['public']['Tables']['categories']['Row']
          id: string
          created_at: string | null
        }
        Insert: {
          name?: string | null
          slug?: string | null
          parent?: string | null
          id?: string
          created_at?: string | null
        }
        Update: {
          name?: string | null
          slug?: string | null
          parent?: string | null
          id?: string
          created_at?: string | null
        }
      }
      supplier: {
        Row: {
          id: string
          created_at: string | null
          name: string | null
          slug: string | null
          contact: string | null
          email: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          name?: string | null
          slug?: string | null
          contact?: string | null
          email?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string | null
          slug?: string | null
          contact?: string | null
          email?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      search_products: {
        Args: { query: string }
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

