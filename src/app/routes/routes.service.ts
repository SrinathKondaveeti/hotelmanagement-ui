import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  currentComponent = signal('login');
  constructor() { }
}
