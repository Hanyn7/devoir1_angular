import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../model/User.model';
import { AuthService } from '../services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  userForm: FormGroup;
  user: User = new User();
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPasswordControl) {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  onSignUp() {
    if (this.userForm.valid) {
      this.user = { ...this.user, ...this.userForm.value };
  
      this.authService.registerUser(this.user).subscribe({
        next: () => {
          const navigationExtras: NavigationExtras = {
            queryParams: { username: this.user.username } 
          };

          this.router.navigate(['verification'], navigationExtras);
        },
        error: (error: any) => {
          console.error('Error occurred:', error);
          this.errorMessage = 'email existe déjà';
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
  
  /*onSignUp() {
    if (this.userForm.valid) {
      this.user = { ...this.user, ...this.userForm.value };

      this.authService.registerUser(this.user).subscribe({
        next: (response: any) => {
          let jwToken = response.headers.get('Authorization');

          if (jwToken) {
            this.authService.saveToken(jwToken);
            this.router.navigate(['verification']);
          } else {
            console.error('No authorization token found.');
            this.errorMessage = 'Aucun jeton d\'autorisation trouvé.';
          }
        },
        error: (error: any) => {
          console.error('Error occurred:', error);
          this.errorMessage = 'email existe déjà';
        }
      });
    } else {
      console.log('Invalid form');
    }
  }*/

 
}
