import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly routerService = inject(Router);

  errorMessage: string = '';
  loading: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  })


  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            //navigate to feed
            this.routerService.navigate(['/feed']);
          }
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error.message;
        },
        complete: () => {
          this.loading = false;
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordIcon(element: HTMLInputElement): void {
    element.type === 'password' ? element.type = 'text' : element.type = 'password';
  }
}
