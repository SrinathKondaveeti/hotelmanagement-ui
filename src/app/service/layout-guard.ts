// src/app/guards/auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LayoutManagementService } from './layout-management.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutManagementGuard implements CanActivate {
  private layoutManagementService = inject(LayoutManagementService);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Get the hideHeader flag from route data (default to false if not specified)
    const hideHeader = route.data['hideHeader'] || false;
    
    // Set header visibility based on the route data
    this.layoutManagementService.setHeaderVisibility(!hideHeader);
    
    return true;
  }
}