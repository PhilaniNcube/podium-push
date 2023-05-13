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
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
        }
      }
      brands: {
        Row: {
          name: string
          slug: string
          image: ImageType
          id: string
          created_at: string
        }
        Insert: {
          name?: string
          slug?: string
          image?: ImageType
          id?: string
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          image?: ImageType
          id?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          name: string
          slug: string
          image: ImageType
          id: string
          created_at: string
        }
        Insert: {
          name?: string
          slug?: string
          image?: ImageType
          id?: string
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          image?: ImageType
          id?: string
          created_at?: string
        }
      }
      product_images: {
        Row: {
          product_id: string
          image_url: string
          id: string
          created_at: string
        }
        Insert: {
          product_id?: string
          image_url?: string
          id?: string
          created_at?: string
        }
        Update: {
          product_id?: string
          image_url?: string
          id?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          brand: Database["public"]["Tables"]["brands"]["Row"]
          category: Database["public"]["Tables"]["categories"]["Row"]
          details: {key: string, value: string}[]
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
          brand?: string
          category?: string
          details?: {
            key: string
            value: string
          }[]
          sub_category?: string
          images?: ImageType[]
          supplier?: string
          id?: string
          created_at?: string
          name?: string
          description?: string
          slug?: string
          refund_policy?: string
          rating?: number
          shipping?: number
          price?: number
          cost?: number
          featured?: boolean
          in_stock?: boolean
          published?: boolean
          warranty?: string
          product_code?: string
        }
        Update: {
          brand?: string
          category?: string
          details?: Json
          sub_category?: string
          images?: ImageType[]
          supplier?: string
          id?: string
          created_at?: string
          name?: string
          description?: string
          slug?: string
          refund_policy?: string
          rating?: number
          shipping?: number
          price?: number
          cost?: number
          featured?: boolean
          in_stock?: boolean
          published?: boolean
          warranty?: string
          product_code?: string
        }
      }
      orders:{
        Row: {
          id: string
          created_at: string
          user_id: string | null
          order_status: "Pending" | "Processing" | "Completed" | "Cancelled" | ""
          payment_status: "Pending" | "Processing" | "Completed" | "Cancelled" | ""
          payment_method:  "Card/EFT" | "Intellimali" | ""
          payment_reference: string
          email: string
          phone: string
          first_name: string
          last_name: string
          shipping_address: {
            street_address: string
            suburb: string
            city: string
            postal_code: string
          }
          shipping_cost: number
          discount_amount: number
          total_amount: number
          tracking_number: string
          notes: string
          order_items: {
            product: Database["public"]["Tables"]["products"]["Row"]
            quantity: number
          }[]
        }
        Insert: {
          id: string
          created_at?: string
          user_id?: string | null
          order_status?: "Pending" | "Processing" | "Completed" | "Cancelled" | ""
          payment_status?: "Pending" | "Processing" | "Completed" | "Cancelled" | ""
          payment_method?: "Cash on Delivery" | "Card/EFT" | "Intellimali" | ""
          payment_reference?: string
          email?: string
          phone?: string
          first_name?: string
          last_name?: string
          shipping_address?: {
            street_address: string
            suburb: string
            city: string
            postal_code: string
          }
          shipping_cost?: number
          discount_amount?: number
          total_amount?: number
          tracking_number?: string
          notes?: string
          order_items?: {
            product: Database["public"]["Tables"]["products"]["Row"]
            quantity: number
          }[]
        }
        Update: {
               id: string
          created_at?: string
          user_id?: string | null
          order_status?: "Pending" | "Processing" | "Completed" | "Cancelled" | ""
          payment_status?: "Pending" | "Processing" | "Completed" | "Cancelled" | ""
          payment_method?: "Cash on Delivery" | "Card/EFT" | "Intellimali" | ""
          payment_reference?: string
          email?: string
          phone?: string
          first_name?: string
          last_name?: string
          shipping_address?: {
            street_address: string
            suburb: string
            city: string
            postal_code: string
          }
          shipping_cost?: number
          discount_amount?: number
          total_amount?: number
          tracking_number?: string
          notes?: string
          order_items?: {
            product: Database["public"]["Tables"]["products"]["Row"]
            quantity: number
          }[]
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          created_at: string
          role: Database["public"]["Tables"]["roles"]
          image: string
          address: Json
        }
        Insert: {
          id: string
          email?: string
          first_name?: string
          last_name?: string
          created_at?: string
          role?: string
          image?: string
          address?: Json
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          created_at?: string
          role?: string
          image?: string
          address?: Json
        }
      }
      roles: {
        Row: {
          role: string
          id: string
        }
        Insert: {
          role?: string
          id?: string
        }
        Update: {
          role?: string
          id?: string
        }
      }
      sub_category: {
        Row: {
          name: string
          slug: string
          parent: Database['public']['Tables']['categories']['Row']
          id: string
          created_at: string
        }
        Insert: {
          name?: string
          slug?: string
          parent?: string
          id?: string
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          parent?: string
          id?: string
          created_at?: string
        }
      }
      supplier: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          contact: string
          email: string
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          contact?: string
          email?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          contact?: string
          email?: string
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

