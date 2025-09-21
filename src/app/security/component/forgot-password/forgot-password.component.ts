import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { ForgotPasswordRequest } from '../../data/forgot-password-request-data';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule, // Add MatCardModule
    MatFormFieldModule, // Add MatFormFieldModule
    MatInputModule, // Add MatInputModule
    MatButtonModule, // Add MatButtonModule
    MatSnackBarModule // Add MatSnackBarModule if you use it in the template
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const request: ForgotPasswordRequest = this.forgotPasswordForm.value;

    this.authService.forgotPassword(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = response;
        this.snackBar.open(response, 'Close', { duration: 5000 });
        this.forgotPasswordForm.reset();
        this.router.navigate(['/verify-email']);
      },
      error: (error) => {
        this.loading = false;
        this.message = error.message || 'An error occurred. Please try again.';
        this.snackBar.open(this.message, 'Close', { duration: 5000 });
      },
    });
  }
}