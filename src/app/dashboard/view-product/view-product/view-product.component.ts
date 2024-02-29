import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { productData } from '../../products/products.model';
import { WalletService } from 'src/app/shared/wallet.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  selectedProduct: productData = new productData;
  userId: string = '';
  currentBalance: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private walletService: WalletService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductId();
    this.getUser();
  }
  getUser() {
    this.authService.user$.subscribe((user) => {
      // console.log(user);
      this.userId = user.uid;
      this.getWallet(this.userId);
    });
  }
  getWallet(id: string) {
    this.walletService.getWallet(id).subscribe((wallet: any) => {
      this.currentBalance = wallet?.balance;
    })
  }

  getProductDetails(productId: any) {
    this.apiService.getProductById(productId).subscribe((product: any) => {
      console.log('Product:', product);
      this.selectedProduct = product;
    });
  }
  // private getProductId(): void {
  //   this.apiService.productId$.subscribe((id) => {
  //     this.getProductDetails(id);
  //   });
  // }
  private getProductId(): void {
    console.log('activatedRoute:', this.activatedRoute.snapshot.firstChild?.params['id']);
    const productId = this.activatedRoute.snapshot.firstChild?.params['id'];
    console.log('Product ID:', productId);
    this.getProductDetails(productId);
  }
  onBuyConfirmed(price: number) {
    if (this.currentBalance >= price) {
      this.walletService.withdraw(this.userId, price);
      this.snackBar.open(`Purchase successful! Your remaining balance is ${this.currentBalance - price}`, 'Close', {
        duration: 5000,
      });
      this.router.navigate(['/dashboard']);
    } else {
      this.snackBar.open('Your current balance is insufficient for this transaction.', 'Close', {
        duration: 5000,
      });
    }
  }
}
