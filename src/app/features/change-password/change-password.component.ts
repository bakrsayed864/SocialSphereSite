import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {

  private readonly fb = inject(FormBuilder);
  private readonly routerService = inject(Router);
  private readonly authService = inject(AuthService);

  changePasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: AbstractControl) {
    const newPassword = form.get('newPassword')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (newPassword !== rePassword && rePassword !== '') {
      form.get('rePassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.changePasswordForm.valid) {
      const formdata : object = {
        'password': this.changePasswordForm.get('password')?.value,
        'newPassword': this.changePasswordForm.get('newPassword')?.value
      }
      this.authService.changePassword(formdata).subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.removeItem('token');
            this.routerService.navigate(['/login']);
          }
        }
      })
    }
    else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
