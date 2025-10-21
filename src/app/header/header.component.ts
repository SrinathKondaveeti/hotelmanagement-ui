import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../security/service/auth.service';
import { map } from 'rxjs';
import { PrivilegeValidatorDirective } from '../security/directive/privilege-validator.directive';

@Component({
  selector: 'app-header',
  imports: [PrivilegeValidatorDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isOpen = false;
  private router = inject(Router);

  private authService = inject(AuthService);
  isUserAuthenticated = signal(false);

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  logout() {
    this.authService.logout();
    this.togglePanel();
  }

  login() {
    this.router.navigate(['/login']);
    this.togglePanel();
  }

  navigateToTasks() {
    this.togglePanel();
    this.router.navigate(['/task/123/143/786/999/AP$/tasks']);
  }

  navigateToMenu(){
    this.router.navigate(['/menu']);
  }

  navigateToManageUser(){
    this.togglePanel();
    this.router.navigate(['/manage/users']);
  }

  ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(
        map((isAuthenticated) => {
          if (isAuthenticated) {
            this.isUserAuthenticated.set(isAuthenticated);
          } else {
            this.isUserAuthenticated.set(false);
          }
        })
      )
      .subscribe();
  }
}
