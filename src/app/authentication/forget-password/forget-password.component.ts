import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';
  showSignInPage: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  onSubmit() {
    // console.log('email: ', this.email);
    if(this.email !== ''){
      this.authService.resetPassword(this.email);
      this.snackBar.open(`A link has been sent to this email address: ${this.email}, please check your inbox.`, 'Close', {
        duration: 5000,
      });
    } else {
      this.snackBar.open('Username invallid', 'Close', {
        duration: 5000,
      });
    }
    this.email = '';
  }
  clickSignIn() {
    // console.log('Sign In button clicked');
    this.showSignInPage = true;
    this.router.navigate(['/signin']);
  }
}
