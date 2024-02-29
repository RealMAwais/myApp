import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { WalletService } from 'src/app/shared/wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean = false;
  currentBalance: number = 0;
  userId: string = '';

  constructor(private authService: AuthService, private router: Router, private walletService: WalletService) { }

  ngOnInit(): void {
    this.isLoggedIn();
    this.getUser();
  }
  getUser() {
    this.authService.user$.subscribe((user) => {
      console.log(user);
      this.userId = user.uid;
      this.getWallet(this.userId);
    });
  }
  getWallet(id: string) {
    this.walletService.getWallet(id).subscribe((wallet: any) => {
      this.currentBalance = wallet?.balance;
    })
  }

  isLoggedIn() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.isSignedIn = true;
      }
    });
  }
  signOut(): void {
    this.authService.signOut();
  }
  openWallet(): void {
    this.router.navigate(['/wallet']);
  }
}
