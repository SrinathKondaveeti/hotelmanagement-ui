import { ItemData } from "./item-data";
import { SelectedItemData } from "./selected-item-data";

export interface CartEntryData extends SelectedItemData{
    selectedTakeawayPieceQuantity:number,
    selectedTakeawayPlateQuantity:number,
    selectedTakeawayTotalPiecePrice:number,
    selectedTakeawayTotalPlatePrice:number,
    selectedTakeawayTotalItemPrice:number,
    totalItemPrice:number
}