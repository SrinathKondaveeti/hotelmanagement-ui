import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderDispenserComponent } from './order-dispenser/order-dispenser.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';
import { CommonComponent } from './common/common.component';

// export const routes: Routes = [

//     {path: 'login', component: LoginComponent},
//     {path: 'siginUp', component: RegisterComponent},
//     {path: 'menu', component: MenuComponent},
//     {path: 'cart', component: CartComponent},
//     {path: 'orderDispenser', component: OrderDispenserComponent},
//     {path: 'tasks', component: TasksComponent},
//     {path: 'home', component: HomePageComponent},
    

// ];

export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'siginUp', component: RegisterComponent },
  // { path: 'menu', component: MenuComponent },
//   { path: 'cart', component: CartComponent },
//   { path: 'orderDispenser', component: OrderDispenserComponent },
  { path: 'task/123/143/786/999/AP$/tasks', component: TasksComponent },
  { path: 'home', component: HomePageComponent },
  { path: '123/143/786/999/AP$/common/component', component: CommonComponent },
  // Redirect empty path to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Wildcard route for unknown paths → show HomePageComponent
  { path: '**', redirectTo: '/home' }
];
