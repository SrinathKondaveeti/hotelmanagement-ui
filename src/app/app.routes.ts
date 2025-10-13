import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderDispenserComponent } from './order-dispenser/order-dispenser.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateTasksComponent } from './create-tasks/create-tasks.component';
import { CommonComponent } from './common/common.component';
import { LoginComponent } from './security/component/login/login.component';
import { RegisterComponent } from './security/component/register/register.component';
import { ForgotPasswordComponent } from './security/component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/component/reset-password/reset-password.component';
import { AuthGuard } from './security/service/auth-guard';
import { VerifyEmailComponent } from './security/component/verify-email/verify-email.component';

// export const routes: Routes = [

//     {path: 'login', component: LoginComponent},
//     {path: 'siginUp', component: RegisterComponent},
//     {path: 'menu', component: MenuComponent},
//     {path: 'cart', component: CartComponent},
//     {path: 'orderDispenser', component: OrderDispenserComponent},
//     {path: 'tasks', component: TasksComponent},
//     {path: 'home', component: HomePageComponent},
    

// ];

// export const routes: Routes = [
// //   { path: 'login', component: LoginComponent },
// //   { path: 'siginUp', component: RegisterComponent },
//   // { path: 'menu', component: MenuComponent },
// //   { path: 'cart', component: CartComponent },
// //   { path: 'orderDispenser', component: OrderDispenserComponent },
//   { path: 'task/123/143/786/999/AP$/tasks', component: TasksComponent },
//   { path: 'home', component: HomePageComponent },
//   { path: '123/143/786/999/AP$/common/component', component: CommonComponent },
//   // Redirect empty path to home
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   // Wildcard route for unknown paths → show HomePageComponent
//   { path: '**', redirectTo: '/home' }
// ];

// export const routes: Routes = [
//   { path: '', redirectTo: '/menu', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'verify-email', component: VerifyEmailComponent },
//   { path: 'forgot-password', component: ForgotPasswordComponent },
//   { path: 'reset-password', component: ResetPasswordComponent },
//   { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
//   { path: '123/143/786/999/AP$/common/component', component: CommonComponent, canActivate: [AuthGuard] },
//   { path: 'task/123/143/786/999/AP$/tasks', component: TasksComponent},
//   // { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] }, // Protected route
//   // Add other protected routes here
//   { path: 'home', component: HomePageComponent},
//   { path: '**', redirectTo: '/menu' }, // Redirect unknown paths
// ];



export const routes: Routes = [
  // Public routes
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'home', component: HomePageComponent },
  
  // Protected routes with AuthGuard
  
  { path: '123/143/786/999/AP$/common/component', component: CommonComponent, canActivate: [AuthGuard] },
  { path: 'task/123/143/786/999/AP$/tasks', component: TasksComponent, canActivate: [AuthGuard] },
  
  
  // Wildcard route should be last
  { path: '**', redirectTo: '/menu' },
];
