import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ItemData } from '../data/item-data';
import { SelectedItemData } from '../data/selected-item-data';
import { ManageDataService } from '../store/manage-data.service';
import { CartEntryData } from '../data/cart-entry-data';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../security/service/auth.service';
import { map, take } from 'rxjs';


@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  private httpClient = inject(HttpClient);
  private router = inject(Router);
  public manageDataService = inject(ManageDataService);
  private baseUrl = environment.apiBaseUrl;
  private authService = inject(AuthService);
  isUserAuthenticated = signal(false);
  chinnaPunugu = 'assets/chinna-punugu.png';


  goToCart() {

    this.router.navigate(['cart']);
  
  }

  
  ngOnInit() {
    this.httpClient.get<Set<ItemData>>(`${this.baseUrl}/item/items`).subscribe((itemDataList) => {
      const itemQuantityDataList = new Array<SelectedItemData>();
      itemDataList.forEach((itemData) => {
        const itemQuantityData1: SelectedItemData = {
          itemId: itemData.itemId,
          name: itemData.name,
          description: itemData.description,
          isOutOfStock: itemData.isOutOfStock,
          quantityPerPlate: itemData.quantityPerPlate,
          platePrice: itemData.platePrice,
          singlePiecePrice: itemData.singlePiecePrice,
          selectedPieceQuantity: 0,
          selectedPlateQuantity: 0,
          selectedTotalPiecePrice: 0,
          selectedTotalPlatePrice: 0,
          selectedTotalItemPrice: 0,
          isParcel: false
        };
        itemQuantityDataList.push(itemQuantityData1);
      });
      this.manageDataService.selectedItemQuantityDataList.set(itemQuantityDataList);
      console.log("selectedItemQuantityDataList", this.manageDataService.selectedItemQuantityDataList());
      // this.manageDataService.cartData.set({ cartEntries: itemQuantityDataList, totalCartPrice: 0 } as unknown as CartData);
      // console.log("cartData", this.manageDataService.cartData());
    });


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


increasePlateQuantity(itemId: string) {
  this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
    if(selectedItemData.itemId === itemId) {
      selectedItemData.selectedPlateQuantity++;
      this.calculateMenuPriceTotals();
    }});
  }

  decreasePlateQuantity(itemId: string) {
    this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
      if(selectedItemData.itemId === itemId) {
        if(selectedItemData.selectedPlateQuantity === 0) {
          return;
        }
        selectedItemData.selectedPlateQuantity--;
        this.calculateMenuPriceTotals();
      }});
  }

  increasePieceQuantity(itemId: string) {
  this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
    if(selectedItemData.itemId === itemId) {
      selectedItemData.selectedPieceQuantity++;
      if(selectedItemData.selectedPieceQuantity === selectedItemData.quantityPerPlate) {
        selectedItemData.selectedPieceQuantity = 0;
        this.increasePlateQuantity(itemId);
        return;
      }
      this.calculateMenuPriceTotals();
    }});
  }

  decreasePieceQuantity(itemId: string) {
    this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
      if(selectedItemData.itemId === itemId) {
        if(selectedItemData.selectedPieceQuantity === 0) {
          return;
        }
        selectedItemData.selectedPieceQuantity--;
        this.calculateMenuPriceTotals();
      }});
  }

  isParcel(itemId: string) {
    this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
      if(selectedItemData.itemId === itemId) {
        selectedItemData.isParcel = !selectedItemData.isParcel;
      }});
      console.log("this.manageDataService.selectedItemQuantityDataList()",this.manageDataService.selectedItemQuantityDataList());
    }

    addToCart(itemId: string) {
      const selectedItemData = this.manageDataService.selectedItemQuantityDataList().find((selectedItemData) => selectedItemData.itemId === itemId);
      
      if(!(selectedItemData && selectedItemData.selectedTotalItemPrice > 0)){
        return;
      }
     
      this.PushFirstItemToCart(selectedItemData as CartEntryData);

      const cartEntryItemData = this.manageDataService.cartData().cartEntries.find((cartEntry) => cartEntry.itemId === selectedItemData?.itemId);
      
      if(cartEntryItemData){
           if(selectedItemData.isParcel){
            cartEntryItemData.selectedTakeawayPieceQuantity = cartEntryItemData.selectedTakeawayPieceQuantity + selectedItemData.selectedPieceQuantity;
            if(cartEntryItemData.selectedTakeawayPieceQuantity === selectedItemData.quantityPerPlate) {
              cartEntryItemData.selectedTakeawayPieceQuantity = 0;
              cartEntryItemData.selectedTakeawayPlateQuantity = cartEntryItemData.selectedTakeawayPlateQuantity + 1;
            }
            cartEntryItemData.selectedTakeawayPlateQuantity = cartEntryItemData.selectedTakeawayPlateQuantity + selectedItemData.selectedPlateQuantity;
           }else{
            cartEntryItemData.selectedPieceQuantity = cartEntryItemData.selectedPieceQuantity + selectedItemData.selectedPieceQuantity;
            if(cartEntryItemData.selectedPieceQuantity === selectedItemData.quantityPerPlate) {
              cartEntryItemData.selectedPieceQuantity = 0;
              cartEntryItemData.selectedPlateQuantity = cartEntryItemData.selectedPlateQuantity + 1;
            }
            cartEntryItemData.selectedPlateQuantity = cartEntryItemData.selectedPlateQuantity + selectedItemData?.selectedPlateQuantity;
           }

      }else{
        if(selectedItemData.isParcel){
          this.manageDataService.cartData().cartEntries.push(
            {
              ...selectedItemData,
              selectedTakeawayPieceQuantity: selectedItemData.selectedPieceQuantity,
              selectedTakeawayPlateQuantity: selectedItemData.selectedPlateQuantity,
              selectedTakeawayTotalPiecePrice: 0,
              selectedTakeawayTotalPlatePrice: 0,
              selectedTakeawayTotalItemPrice: 0,
              selectedPieceQuantity: 0,
              selectedPlateQuantity: 0,
              selectedTotalPiecePrice: 0,
              selectedTotalPlatePrice: 0,
              selectedTotalItemPrice: 0,
              totalItemPrice: 0
            });
        }else{

          this.manageDataService.cartData().cartEntries.push(
            {
              ...selectedItemData,
              selectedTakeawayPieceQuantity: 0,
              selectedTakeawayPlateQuantity: 0,
              selectedTakeawayTotalPiecePrice: 0,
              selectedTakeawayTotalPlatePrice: 0,
              selectedTakeawayTotalItemPrice: 0,
              selectedPieceQuantity: selectedItemData.selectedPieceQuantity,
              selectedPlateQuantity: selectedItemData.selectedPlateQuantity,
              selectedTotalPiecePrice: 0,
              selectedTotalPlatePrice: 0,
              selectedTotalItemPrice: 0,
              totalItemPrice: 0
            });
        }

      }
      this.resetMenuForm();
      this.calculateCartPriceTotals();
      console.log("this.manageDataService.cartData()",this.manageDataService.cartData());
    }


    resetMenuForm() {
      this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
        selectedItemData.selectedPieceQuantity = 0;
        selectedItemData.selectedPlateQuantity = 0;
        selectedItemData.selectedTotalPiecePrice = 0;
        selectedItemData.selectedTotalPlatePrice = 0;
        selectedItemData.selectedTotalItemPrice = 0;  
        selectedItemData.isParcel = false;
      });
      this.calculateMenuPriceTotals();
    }

    PushFirstItemToCart(selectedItemData: CartEntryData) {
      if (this.manageDataService.cartData().cartEntries == undefined) {
        let cartEntries = new Array<CartEntryData>();
        const newEntry: CartEntryData = {
          itemId: selectedItemData.itemId,
          name: selectedItemData.name,
          description: selectedItemData.description,
          isOutOfStock: selectedItemData.isOutOfStock,
          quantityPerPlate: selectedItemData.quantityPerPlate,
          platePrice: selectedItemData.platePrice,
          singlePiecePrice: selectedItemData.singlePiecePrice,
          selectedPieceQuantity: 0,
          selectedPlateQuantity: 0,
          selectedTotalPiecePrice: 0,
          selectedTotalPlatePrice: 0,
          selectedTotalItemPrice: 0,
          isParcel: false,
          selectedTakeawayPieceQuantity: 0,
          selectedTakeawayPlateQuantity: 0,
          selectedTakeawayTotalPiecePrice: 0,
          selectedTakeawayTotalPlatePrice: 0,
          selectedTakeawayTotalItemPrice: 0,
          totalItemPrice: 0
        }
        cartEntries.push(newEntry);
        this.manageDataService.cartData().cartEntries=cartEntries;
      }

    }
      
  calculateMenuPriceTotals() {
   this.manageDataService.selectedItemQuantityDataList().forEach((selectedItemData) => {
    selectedItemData.selectedTotalPiecePrice = selectedItemData.selectedPieceQuantity * selectedItemData.singlePiecePrice;
    selectedItemData.selectedTotalPlatePrice = selectedItemData.selectedPlateQuantity * selectedItemData.platePrice;
    selectedItemData.selectedTotalItemPrice = selectedItemData.selectedTotalPiecePrice + selectedItemData.selectedTotalPlatePrice;
   });
  }

  calculateCartPriceTotals() {
    let totalCartPrice = 0;
   this.manageDataService.cartData().cartEntries.forEach((cartEntryItemData) => {
    cartEntryItemData.selectedTotalPiecePrice = cartEntryItemData.selectedPieceQuantity * cartEntryItemData.singlePiecePrice;
    cartEntryItemData.selectedTotalPlatePrice = cartEntryItemData.selectedPlateQuantity * cartEntryItemData.platePrice;
    cartEntryItemData.selectedTotalItemPrice = cartEntryItemData.selectedTotalPiecePrice + cartEntryItemData.selectedTotalPlatePrice;

    cartEntryItemData.selectedTakeawayTotalPiecePrice = cartEntryItemData.selectedTakeawayPieceQuantity * cartEntryItemData.singlePiecePrice;
    cartEntryItemData.selectedTakeawayTotalPlatePrice = cartEntryItemData.selectedTakeawayPlateQuantity * cartEntryItemData.platePrice;
    cartEntryItemData.selectedTakeawayTotalItemPrice = cartEntryItemData.selectedTakeawayTotalPiecePrice + cartEntryItemData.selectedTakeawayTotalPlatePrice;
    
    cartEntryItemData.totalItemPrice = cartEntryItemData.selectedTotalItemPrice + cartEntryItemData.selectedTakeawayTotalItemPrice;
    
    totalCartPrice =  totalCartPrice + cartEntryItemData.totalItemPrice;
   });
   this.manageDataService.cartData().totalCartPrice = totalCartPrice;
  }


}