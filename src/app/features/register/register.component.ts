import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly routerService = inject(Router);
  private readonly fb = inject(FormBuilder);
  errorMessage: string = '';
  loading: boolean = false;
  registerSubscription: Subscription = new Subscription();

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  }, { validators: this.passwordMatchValidator });
  
  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  //   username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  //   rePassword: new FormControl('', [Validators.required]),
  //   dateOfBirth: new FormControl('', [Validators.required]),
  //   gender: new FormControl('', [Validators.required]),
  // }, {validators: this.passwordMatchValidator});

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (password !== rePassword && rePassword !== '') {
      form.get('rePassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } 
    return null;
  }
  
  submitForm(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.registerSubscription.unsubscribe(); // Unsubscribe from any existing subscription  

      this.registerSubscription = this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            this.routerService.navigate(['/login']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  togglePasswordIcon(element: HTMLInputElement):void{
    element.type === 'password'? element.type = 'text' : element.type = 'password';
  }
}
