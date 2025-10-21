import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

  userEmail: string = '';
  userRole: string = '';
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  updateUserRoles(){

   if(this.userEmail && this.userRole){
 
    console.log("userEmail",this.userEmail);
    console.log("userRole",this.userRole);

    this.http.post<any>(`${this.baseUrl}/user/authorize/updateUserRole`, {userEmail:this.userEmail, userRole:this.userRole}).pipe(
        tap((response: any) => { // Optional: You can explicitly type the response here for clarity
          console.log('Role updated:', response); // A good place to log the response
          this.userEmail = '';
          this.userRole = '';
        })
      ).subscribe();

   }

    
  }

}
