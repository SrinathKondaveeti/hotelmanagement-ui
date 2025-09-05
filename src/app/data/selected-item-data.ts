import { ItemData } from "./item-data";

export interface SelectedItemData extends ItemData{
    selectedPieceQuantity:number,
    selectedPlateQuantity:number,
    selectedTotalPiecePrice:number,
    selectedTotalPlatePrice:number,
    selectedTotalItemPrice:number,
    isParcel: boolean
}
