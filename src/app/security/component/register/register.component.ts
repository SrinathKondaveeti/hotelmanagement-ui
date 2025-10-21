import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';
import { RegisterRequest } from '../../data/register-request-data';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule, // Add MatCardModule
    MatFormFieldModule, // Add MatFormFieldModule
    MatInputModule, // Add MatInputModule
    MatButtonModule, // Add MatButtonModule
    MatSnackBarModule, // Add MatSnackBarModule if you use it in the template
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, email, password, confirmPassword } =
      this.registerForm.value;
    const request: RegisterRequest = {
      username,
      email,
      password,
      confirmPassword,
    };

    this.authService.register(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        //this.router.navigate(['/verify-email']);
        this.router.navigate(['/verify-email'], {
          queryParams: { source: 'registration' },
        });
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          error.message || 'Registration failed. Please try again.',
          'Close',
          { duration: 5000 }
        );
      },
    });
  }
}
