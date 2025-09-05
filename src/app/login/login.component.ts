import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManageDataService } from '../store/manage-data.service';
import { RoutesService } from '../routes/routes.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  private httpClient = inject(HttpClient);
  private routesService = inject(RoutesService);
  private router = inject(Router);
  private baseUrl = environment.apiBaseUrl;

  isCredentialsMatching = signal(false);

userLoginForm = new FormGroup({
  phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]), 
  password: new FormControl('',[Validators.required])});
 

  onUserLoginformSubmit(){

    if (this.userLoginForm.valid) {

      this.httpClient.post(`${this.baseUrl}/user/login`, this.userLoginForm.value,{
        withCredentials: true // Essential for cookies
      }).subscribe({

        next: (response: any) => {  
          this.userLoginForm.reset();
          console.log('User logged in successfully:', response);
          this.router.navigate(['menu']);

        },
        
        error: (error: any) => { 
          console.error('Error occurred:', error); 
          this.isCredentialsMatching.set(true);
        }
      }
       ,
        
      );
      console.log('Form Submitted!', this.userLoginForm);
      this.userLoginForm.reset();
    } else {
      console.log('Form is invalid', this.userLoginForm);
  }

}

showComponent() {
  this.router.navigate(['siginUp']);
}
}
