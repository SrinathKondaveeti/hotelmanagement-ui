import { Component, computed, inject, signal } from '@angular/core';
import { ManageDataService } from '../store/manage-data.service';
import { HttpClient } from '@angular/common/http';
import { OrderData } from '../data/order-data';
import { CartData } from '../data/cart-data';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../security/service/auth.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private baseUrl = environment.apiBaseUrl;
  private authService = inject(AuthService);
  isUserAuthenticated = signal(false);

  ngOnInit() {
  
  
      this.authService.isAuthenticated$.pipe(
            map((isAuthenticated) => {
              if (isAuthenticated) {
                this.isUserAuthenticated.set(isAuthenticated);
              } else {
                  this.isUserAuthenticated.set(false);
              }
            })
          ).subscribe();
  
  
  
    }
  

  logout(){
     this.authService.logout();
  }

  login(){
    this.router.navigate(['/login']);
  }
  
removeFromCart(itemId : string) {
  this.manageDataService.cartData().cartEntries = this.manageDataService.cartData().cartEntries.filter((item) => item.itemId !== itemId);
  this.calculatePriceTotals();
}

  public manageDataService = inject(ManageDataService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  orderId = computed(() => this.manageDataService.orderData().orderId);

increaseDineInPieceQuantity(itemId: string) {
  this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
    if(itemQuantityData.itemId === itemId) {
      itemQuantityData.selectedPieceQuantity++;
      if(itemQuantityData.selectedPieceQuantity === itemQuantityData.quantityPerPlate) {
        itemQuantityData.selectedPieceQuantity = 0;
        this.increaseDineInPlateQuantity(itemId);
        return;
      }else{
        this.calculatePriceTotals();
      }
    }});
}
decreaseDineInPieceQuantity(itemId: string) {
  this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
    if(itemQuantityData.itemId === itemId) {
      if(itemQuantityData.selectedPieceQuantity === 0) {
        return;
      }
      itemQuantityData.selectedPieceQuantity--;
    }});
    this.calculatePriceTotals();
}

isParcel(itemId: string, isParcel: boolean) {
  this.manageDataService.cartData().cartEntries.forEach((cartEntryItemData) => {
    if(cartEntryItemData.itemId === itemId) {
      cartEntryItemData.isParcel = !cartEntryItemData.isParcel;
      if(isParcel){
        cartEntryItemData.selectedTakeawayPieceQuantity = cartEntryItemData.selectedTakeawayPieceQuantity + cartEntryItemData.selectedPieceQuantity;
        cartEntryItemData.selectedPieceQuantity = 0;
        cartEntryItemData.selectedTakeawayPlateQuantity = cartEntryItemData.selectedTakeawayPlateQuantity + cartEntryItemData.selectedPlateQuantity;
        cartEntryItemData.selectedPlateQuantity = 0;
      }else{
        cartEntryItemData.selectedPieceQuantity = cartEntryItemData.selectedPieceQuantity + cartEntryItemData.selectedTakeawayPieceQuantity;
        cartEntryItemData.selectedTakeawayPieceQuantity = 0;
        cartEntryItemData.selectedPlateQuantity = cartEntryItemData.selectedPlateQuantity + cartEntryItemData.selectedTakeawayPlateQuantity;
        cartEntryItemData.selectedTakeawayPlateQuantity = 0;
      }
      this.calculatePriceTotals();
    }});
  }

increaseDineInPlateQuantity(itemId: string) {
  this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
    if(itemQuantityData.itemId === itemId) {
      itemQuantityData.selectedPlateQuantity++;
    }});
    this.calculatePriceTotals();
  }

decreaseDineInPlateQuantity(itemId: string) {
  this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
    if(itemQuantityData.itemId === itemId) {
      if(itemQuantityData.selectedPlateQuantity === 0) {
        return;
      }
      itemQuantityData.selectedPlateQuantity--;
    }});
    this.calculatePriceTotals();
  }
  
  increaseTakeawayPieceQuantity(itemId: string) {
    this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
      if(itemQuantityData.itemId === itemId) {
        itemQuantityData.selectedTakeawayPieceQuantity++;
        if(itemQuantityData.selectedTakeawayPieceQuantity === itemQuantityData.quantityPerPlate) {
          itemQuantityData.selectedTakeawayPieceQuantity = 0;
          this.increaseTakeawayPlateQuantity(itemId);
          return;
        }else{
          this.calculatePriceTotals();
        }
      }});
    }
    decreaseTakeawayPieceQuantity(itemId: string) {
      this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
        if(itemQuantityData.itemId === itemId) {
          if(itemQuantityData.selectedTakeawayPieceQuantity === 0) {
            return;
          }
          itemQuantityData.selectedTakeawayPieceQuantity--;
        }});
        this.calculatePriceTotals();
    }

increaseTakeawayPlateQuantity(itemId: string) {
  this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
    if(itemQuantityData.itemId === itemId) {
      itemQuantityData.selectedTakeawayPlateQuantity++;
    }});
    this.calculatePriceTotals();
}
decreaseTakeawayPlateQuantity(itemId: string) {
  this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
    if(itemQuantityData.itemId === itemId) {
      if(itemQuantityData.selectedTakeawayPlateQuantity === 0) {
        return;
      }
      itemQuantityData.selectedTakeawayPlateQuantity--;
    }});
    this.calculatePriceTotals();
}
  
    calculatePriceTotals() {
      let totalCartPrice = 0;
     this.manageDataService.cartData().cartEntries.forEach((itemQuantityData) => {
      itemQuantityData.selectedTotalPiecePrice = itemQuantityData.selectedPieceQuantity * itemQuantityData.singlePiecePrice;
      itemQuantityData.selectedTotalPlatePrice = itemQuantityData.selectedPlateQuantity * itemQuantityData.platePrice;
      itemQuantityData.selectedTotalItemPrice = itemQuantityData.selectedTotalPiecePrice + itemQuantityData.selectedTotalPlatePrice;

      itemQuantityData.selectedTakeawayTotalPiecePrice = itemQuantityData.selectedTakeawayPieceQuantity * itemQuantityData.singlePiecePrice;
      itemQuantityData.selectedTakeawayTotalPlatePrice = itemQuantityData.selectedTakeawayPlateQuantity * itemQuantityData.platePrice;
      itemQuantityData.selectedTakeawayTotalItemPrice = itemQuantityData.selectedTakeawayTotalPiecePrice + itemQuantityData.selectedTakeawayTotalPlatePrice;
      
      itemQuantityData.totalItemPrice = itemQuantityData.selectedTotalItemPrice + itemQuantityData.selectedTakeawayTotalItemPrice;
      
      totalCartPrice =  totalCartPrice + itemQuantityData.totalItemPrice;
     });
     this.manageDataService.cartData().totalCartPrice = totalCartPrice;
  
    }

    placeOrder() {
console.log('placeOrder() called');
      if (this.manageDataService.cartData().cartEntries.length > 0 && this.manageDataService.cartData().totalCartPrice > 0) {

        this.httpClient.post<OrderData>(`${this.baseUrl}/order/placeOrder`, this.manageDataService.cartData(),{
          withCredentials: true // Essential for cookies
        }).subscribe(
          (orderData: OrderData) => {  
            this.manageDataService.orderData.set(orderData);
            this.manageDataService.cartData.set({} as CartData);
            console.log('Order Placed in successfully:', this.manageDataService.orderData());
            console.log('Order response:', orderData);
          },
          (error: any) => {
            //this.manageDataService.orderData.set({} as OrderData);
            console.error('Error occurred:', error); 
          }
        );

      }
    }

    goToMenu() {
      this.router.navigate(['menu']);
      }

      goToDispenser() {
        this.router.navigate(['orderDispenser']);
        }
        

}


