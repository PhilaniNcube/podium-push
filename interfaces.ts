import { Database } from "./schema";

export interface CartItem {
  product:Database["public"]["Tables"]["products"]["Row"];
  qty: number;
}


export type Product = Database["public"]["Tables"]["products"]["Row"];
