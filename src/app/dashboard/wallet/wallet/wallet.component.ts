import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';
import { WalletService } from 'src/app/shared/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  currentBalance: number = 0;
  topUpAmount: number = 0;
  withDrawAmount: number = 0;
  userId: string = '';

  constructor(
    private authService: AuthService,
    private walletService: WalletService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
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
  topUpBalance() {
    if(this.topUpAmount > 0){
      this.walletService.topUp(this.userId, this.topUpAmount);
      this.snackBar.open(`${this.topUpAmount} has been added in your wallet.`, 'Close', {
        duration: 5000,
      });
    } else {
      this.snackBar.open('Please, Enter an amount.', 'Close', {
        duration: 5000,
      });
    }
    this.topUpAmount = 0;
  }
  withdDrawBalance() {
    if(this.withDrawAmount > 0 && this.withDrawAmount <= this.currentBalance){
      this.walletService.withdraw(this.userId, this.withDrawAmount);
      this.snackBar.open(`${this.withDrawAmount} has been withdrawn from your wallet.`, 'Close', {
        duration: 5000,
      });
    } else {
      this.snackBar.open('Please, Enter a valid amount.', 'Close', {
        duration: 5000,
      });
    }    
    this.withDrawAmount = 0;
  }
}
