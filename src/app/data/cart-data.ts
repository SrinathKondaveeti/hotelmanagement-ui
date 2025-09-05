import { CartEntryData } from "./cart-entry-data";

export interface CartData {
    cartEntries: Array<CartEntryData>,
    totalCartPrice:number
}
