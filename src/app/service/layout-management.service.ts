import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutManagementService {


  private showHeader = signal<boolean>(true);
  
  // Readonly signal for external consumption
  readonly showHeaderSignal = this.showHeader.asReadonly();

  hideHeader() {
    this.showHeader.set(false);
  }

  displayHeader() {
    this.showHeader.set(true);
  }

  setHeaderVisibility(visible: boolean) {
    this.showHeader.set(visible);
  }
}
