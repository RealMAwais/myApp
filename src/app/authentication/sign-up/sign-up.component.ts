import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  showSignInPage: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    console.log('Submit button clicked');
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;

      this.authService.signUp(email, password)
        .then((result) => {
          console.log('User created successfully:', result.user);
          return this.authService.signOut();
        })
        .then(() => {
          this.router.navigate(['/signin']);
        })
        .catch((error) => {
          console.error('Signup error:', error);
        });
    }
  }
  clickSignIn() {
    // console.log('Sign In button clicked');
    this.showSignInPage = true;
    this.router.navigate(['/signin']);
  }
}
