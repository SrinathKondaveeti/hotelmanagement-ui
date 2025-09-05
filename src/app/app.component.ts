import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ManageDataService } from './store/manage-data.service';
import { MenuComponent } from "./menu/menu.component";
import { CartComponent } from "./cart/cart.component";
import { RoutesService } from './routes/routes.service';
// import { MatTabsModule } from '@angular/material/tabs';
import { OrderDispenserComponent } from "./order-dispenser/order-dispenser.component";
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClient } from '@angular/common/http';
import { ItemData } from './data/item-data';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private routesService = inject(RoutesService);

  currentComponent = this.routesService.currentComponent; // Default component



  showComponent(component: string) {
    this.routesService.currentComponent.set(component);
  }
}
