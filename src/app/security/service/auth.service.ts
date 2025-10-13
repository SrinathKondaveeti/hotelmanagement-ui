import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginRequest } from "../data/login-request-data";
import { AuthResponse } from "../data/auth-response-data";
import { RegisterRequest } from "../data/register-request-data";
import { ForgotPasswordRequest } from "../data/forgot-password-request-data";
import { ResetPasswordRequest } from "../data/reset-password-request-data";
import { EmailVerificationRequest } from "../data/email-verification-request-data";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasTokens());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isAuthenticatedSubject.next(true);
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/login`, request).pipe(
      tap((response) => {
        this.setTokens(response.accessToken, response.refreshToken);
      }),
      catchError(this.handleError)
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/register`, request).pipe(
      tap((response) => {
        this.setTokens(response.accessToken, response.refreshToken);
      }),
      catchError(this.handleError)
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/auth/forgot-password`, request, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  //   verifyEmail(request: EmailVerificationRequest): Observable<AuthResponse> {
  //   return this.http.post(`${this.baseUrl}/api/auth/verify-email`, request).pipe(
  //     tap((response) => { response }),
  //     catchError(this.handleError)
  //   );
  // }

  verifyEmail(request: EmailVerificationRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/verify-email`, request).pipe(
    tap((response: AuthResponse) => { // Optional: You can explicitly type the response here for clarity
      console.log('Verification response:', response); // A good place to log the response
    }),
    catchError(this.handleError)
  );
}


  resetPassword(request: ResetPasswordRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/api/auth/reset-password`, request, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available.'));
    }
    return this.http
      .post<AuthResponse>(
        `${this.baseUrl}/api/auth/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .pipe(
        tap((response) => {
          this.setTokens(response.accessToken, response.refreshToken);
        }),
        catchError((error) => {
          this.logout(); // If refresh fails, log out the user
          return this.handleError(error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/menu']); // Redirect to login after logout
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'object' && error.error.message) {
      // Backend error message (e.g., from AuthResponse)
      errorMessage = error.error.message;
    } else {
      // Other backend errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); // Log error for debugging
    return throwError(() => new Error(errorMessage));
  }
}