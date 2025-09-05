import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  banners: string[] = [
  'assets/menu.png',
  'assets/AP_Logo.png'
];

delays: number[] = [5000, 2000]; // corresponding delays in milliseconds
currentIndex: number = 0;
timeoutId: any;

ngOnInit() {
  this.startRotation();
}

startRotation() {
  this.timeoutId = setTimeout(() => {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    this.startRotation(); // call again recursively
  }, this.delays[this.currentIndex]);
}

ngOnDestroy() {
  clearTimeout(this.timeoutId);
}

}
