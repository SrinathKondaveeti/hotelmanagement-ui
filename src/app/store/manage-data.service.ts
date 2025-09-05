import { Injectable, signal } from '@angular/core';
import { SelectedItemData } from '../data/selected-item-data';
import { CartData } from '../data/cart-data';
import { OrderData } from '../data/order-data';
import { OrderDispenserData } from '../data/order-dispenser-data';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {
  selectedItemQuantityDataList = signal<Array<SelectedItemData>>(new Array<SelectedItemData>());
  cartData = signal<CartData>({} as CartData);
  orderData = signal<OrderData>({} as OrderData);
  orderDispenserData = signal<Array<OrderDispenserData>>(new Array<OrderDispenserData>());
  constructor() { }
}
