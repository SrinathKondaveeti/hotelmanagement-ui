// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject, signal } from '@angular/core';
// import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
// import { catchError, delay, map, Observable, of } from 'rxjs';
// import { ManageDataService } from '../store/manage-data.service';
// import { RoutesService } from '../routes/routes.service';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';

// @Component({
//   selector: 'app-register',
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {




//   private httpClient = inject(HttpClient);
//   private router = inject(Router);
//   private baseUrl = environment.apiBaseUrl;

//   showComponent() {
//     this.router.navigate(['login']);
//     }

// userRegistrationform = new FormGroup({
//   phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')], 
//  [this.userPhoneNumberAvailabilityValidator()]
// ),
//   password: new FormControl('', Validators.required),
//   reEnterPassword: new FormControl('', Validators.required)
// }, { 
//   validators: this.matchValidator('password', 'reEnterPassword') 
// });
 

// onUserRegistrationformSubmit() {
//   if (this.userRegistrationform.valid) {
//     this.httpClient.post(`${this.baseUrl}/user/register`, this.userRegistrationform.value).subscribe(
//       (response: any) => { 
//         this.userRegistrationform.reset();
//         console.log('User registered successfully:', response);
//         this.router.navigate(['login']);
//       },
//       (error: any) => { console.error('Error occurred:', error);
//       }
//     );

//     this.router.navigate(['login']);
//     console.log('Form Submitted!', this.userRegistrationform);
//     this.userRegistrationform.reset();
//   } else {
//     console.log('Form is invalid', this.userRegistrationform);
//   }
// }


//  userPhoneNumberAvailabilityValidator(
//   entredPhoneNumber?: string
// ): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     console.log('control.value', control.value);
//     if (entredPhoneNumber && control.value === entredPhoneNumber) {
//       console.log('Skip validation if username hasnt changed');
//       return of(null); // Skip validation if username hasn't changed
//     }
    
//     if (!control.value) {
//       console.log('Skip if empty');
//       return of(null); // Skip if empty
//     }

//     return this.checkPhoneNumberAvailability(control.value).pipe(
//       map(isAvailable => (isAvailable ? { phoneNumberTaken: true } : null)),
//       catchError(() => of(null)) // In case of error, consider it valid
//     );
//   };
// }

// checkPhoneNumberAvailability(enteredPhoneNumber: number): Observable<boolean> {
//   return this.httpClient.get<boolean>(`${this.baseUrl}/user/validatePhoneNumber?phoneNumber=` + enteredPhoneNumber).pipe(
//     catchError((error: any) => {
//       console.error('Error occurred:', error);
//       return of(false); // Return false in case of an error
//     })
//   );
// }


//   matchValidator(
//   controlName: string,
//   matchingControlName: string
// ) {
//   return (formGroup: AbstractControl): ValidationErrors | null => {
//     const control = formGroup.get(controlName);
//     const matchingControl = formGroup.get(matchingControlName);

//     if (!control || !matchingControl) {
//       return null;
//     }

//     // Don't validate if matching control has no value or has errors
//     if (matchingControl.errors && !matchingControl.errors['mismatch']) {
//       return null;
//     }

//     // Set error if values don't match
//     console.log('control.value', control.value);
//     console.log('matchingControl.value', matchingControl.value);
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mismatch: true });
//       return { mismatch: true };
//     } else {
//       matchingControl.setErrors(null);
//       return null;
//     }
//   };
// }


// }
