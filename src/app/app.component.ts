import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ManageDataService } from './store/manage-data.service';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { RoutesService } from './routes/routes.service';
// import { MatTabsModule } from '@angular/material/tabs';
import { OrderDispenserComponent } from './order-dispenser/order-dispenser.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { ItemData } from './data/item-data';
import { LayoutManagementGuard } from './service/layout-guard';
import { HeaderComponent } from "./header/header.component";
import { LayoutManagementService } from './service/layout-management.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private layoutManagementService = inject(LayoutManagementService);
  showHeader = this.layoutManagementService.showHeaderSignal;
  
  
}
