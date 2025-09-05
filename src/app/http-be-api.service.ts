import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpBeApiService {
  currentComponent = signal('login');
  constructor() { }
}
