import { ItemData } from "./item-data";

export interface OrderDispenserData {
    orderId:string;
    totalAmount:number;
    orderStatus:string;
    orderDispenserSequenceNumber:number;
    orderEntries: OrderEntryData[];
}

export interface OrderEntryData{

    orderEntryId:string;

    item:ItemData;

    dineInPieceQuantity: number;
    dineInPlateQuantity: number;
    dineInTotalPiecePrice: number;
    dineInTotalPlatePrice: number;
    dineInTotalItemPrice: number;

    takeawayPieceQuantity: number;
    takeawayPlateQuantity: number;
    takeawayTotalPiecePrice: number;
    takeawayTotalPlatePrice: number;
    takeawayTotalItemPrice: number;

    totalItemPrice:number;

    orderEntryStatus: string;

}