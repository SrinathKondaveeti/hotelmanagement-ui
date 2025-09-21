import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { ResetPasswordRequest } from '../../data/reset-password-request-data';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule, // Add MatCardModule
    MatFormFieldModule, // Add MatFormFieldModule
    MatInputModule, // Add MatInputModule
    MatButtonModule, // Add MatButtonModule
    MatSnackBarModule // Add MatSnackBarModule if you use it in the template
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading = false;
  email: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.token = this.route.snapshot.queryParamMap.get('token');
    // if (!this.token) {
    //   this.snackBar.open('Invalid or missing reset token.', 'Close', { duration: 5000 });
    //   this.router.navigate(['/forgot-password']);
    //   return;
    // }

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log('Retrieved Token:', this.email);
      // Now you can use the token for your logic, e.g., calling an API
    });

    this.resetPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmNewPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid || !this.email) {
      return;
    }

    this.loading = true;
    const { newPassword, confirmNewPassword } = this.resetPasswordForm.value;
    const request: ResetPasswordRequest = {
      token: this.email,
      newPassword,
      confirmNewPassword,
    };

    this.authService.resetPassword(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open(response, 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(error.message || 'Password reset failed. Please try again.', 'Close', { duration: 5000 });
      },
    });
  }
}