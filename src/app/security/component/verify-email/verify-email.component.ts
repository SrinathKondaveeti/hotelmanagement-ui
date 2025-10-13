import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { EmailVerificationRequest } from '../../data/email-verification-request-data';

@Component({
  selector: 'app-verify-email',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
  emailVerificationForm!: FormGroup;
  loading = false;
  message: string = '';
  isNavigatingFrom = '';
  // email='';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.emailVerificationForm = this.fb.group({
      verificationCode : ['', [Validators.required, Validators.minLength(6)]],
    });
     const navigation = this.router.getCurrentNavigation();
     if (navigation && navigation.extras && navigation.extras.state) {
       this.isNavigatingFrom = navigation.extras.state['isNavigatingFrom'];
     }

  }

  onSubmit(): void {
    if (this.emailVerificationForm.invalid) {
      return;
    }

    this.loading = true;
    const request: EmailVerificationRequest = this.emailVerificationForm.value;

    this.authService.verifyEmail(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = response.message;
        this.snackBar.open(response.message, 'Close', { duration: 5000 });
        // this.email = response.accessToken;
        this.emailVerificationForm.reset();
        if(this.isNavigatingFrom && this.isNavigatingFrom === 'registration'){
          this.router.navigate(['/login']);
        }else{
            this.router.navigate(['/reset-password'], {
              queryParams: { email: response.accessToken }
           });

        }
      },
      error: (error) => {
        this.loading = false;
        this.message = error.message || 'An error occurred. Please try again.';
        this.snackBar.open(this.message, 'Close', { duration: 5000 });
      },
    });
  }
}
