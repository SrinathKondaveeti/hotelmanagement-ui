import { Component, inject, signal } from '@angular/core';
import { OrderDispenserData } from '../data/order-dispenser-data';
import { HttpClient } from '@angular/common/http';
import { ManageDataService } from '../store/manage-data.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order-dispenser',
  imports: [],
  templateUrl: './order-dispenser.component.html',
  styleUrl: './order-dispenser.component.css'
})


export class OrderDispenserComponent {

  private router = inject(Router);

increaseDineInPieceQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
decreaseDineInPieceQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
decreaseDineInPlateQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
increaseDineInPlateQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
decreaseTakeawayPieceQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
increaseTakeawayPieceQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
decreaseTakeawayPlateQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
increaseTakeawayPlateQuantity(arg0: string) {
throw new Error('Method not implemented.');
}
isParcel(arg0: string,arg1: boolean) {
throw new Error('Method not implemented.');
}
cancelOrder(arg0: string) {
throw new Error('Method not implemented.');
}
holdOrder(arg0: string) {
throw new Error('Method not implemented.');
}

  private httpClient = inject(HttpClient);
  public manageDataService = inject(ManageDataService);
  toggleDropdownOpenMap = signal<Map<string, boolean>>(new Map<string, boolean>());
  private baseUrl = environment.apiBaseUrl;



  toggleDropdown(orderId: string) {
    this.toggleDropdownOpenMap.update(map => {
      const currentState = map.get(orderId) || false;
      map.set(orderId, !currentState);
      return map;
    });
    console.log("toggleDropdownOpenMap", this.toggleDropdownOpenMap());
  }

    ngOnInit() {
      this.httpClient.get<Array<OrderDispenserData>>(`${this.baseUrl}/order/dispenser`).subscribe((orderDispenserData) => {
          console.log("orderDispenserData", orderDispenserData);
          orderDispenserData.sort((a, b) => b.orderDispenserSequenceNumber - a.orderDispenserSequenceNumber);
          this.manageDataService.orderDispenserData.set(orderDispenserData);
          orderDispenserData.forEach((orderDispenserData) => {
            this.toggleDropdownOpenMap.update(map => map.set(orderDispenserData.orderId, false));});
          console.log("toggleDropdownOpenMap", this.toggleDropdownOpenMap());
          console.log("manageDataService orderDispenserData", this.manageDataService.orderDispenserData());
          },
        (error: any) => { 
          console.error('Error occurred:', error); 
          //this.isCredentialsMatching.set(true);
        });
      }

      orderDelivered(orderId: string) {
        const body = { status: 'DELIVERED' };
        this.httpClient.post<string>(`${this.baseUrl}/order/updateOrderStatus?orderId=`+orderId,
          body
        ).subscribe(
          (response: any) => {
            console.log("Order delivered successfully", response);
            this.httpClient.get<Array<OrderDispenserData>>(`${this.baseUrl}/order/dispenser`).subscribe((orderDispenserData) => {
              console.log("orderDispenserData", orderDispenserData);
              orderDispenserData.sort((a, b) => b.orderDispenserSequenceNumber - a.orderDispenserSequenceNumber);
              this.manageDataService.orderDispenserData.set(orderDispenserData);
              console.log("manageDataService orderDispenserData", this.manageDataService.orderDispenserData());
            });
          },
          (error: any) => {
            //this.manageDataService.orderData.set({} as OrderData);
            console.error('Error occurred:', error); 
          }
        );

        }

        goToMenu() {
          this.router.navigate(['menu']);
          }

}
