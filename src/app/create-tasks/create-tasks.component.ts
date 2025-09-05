import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tasks',
  imports: [],
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.scss'
})
export class CreateTasksComponent {

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  ngOnInit() {

    
      
  }



     


    

}
