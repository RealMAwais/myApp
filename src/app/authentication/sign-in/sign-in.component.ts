import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  showSignUpPage: boolean = false;
  isForget: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    this.authService.signIn(this.email, this.password).then((user) => {
      if(user){
        this.router.navigate(['/dashboard']);
      }      
    }).catch((error) => {
      console.error('Sign In Error:', error.message);
    });
  }
  clickSignUp(){
    this.showSignUpPage = true;
  }
  clickForgetBtn(){
    this.isForget = true;
  }
  
}
