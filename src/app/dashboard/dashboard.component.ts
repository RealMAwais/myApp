import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isEditPage: boolean = false;
  isViewPage: boolean = false;
  isWalletPage: boolean = false;
  isDashboard: boolean = false;
  initialProductsCount: number = 0;
  initialized: boolean = false;
  userLoggedIn: boolean = false;
  productAddedSinceLogin: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      console.log('User:', user);
      if (!user) {
        this.router.navigate(['/signin']);
      } else {
        this.userLoggedIn = true;
        this.getRoute();
      }
    });
    this.getRoute();
    if (!this.initialized) {
      this.initialized = true;
      this.listenForNewProducts();
      console.log('intialized.');
    }
    this.apiService.getProducts().pipe(take(1)).subscribe((products: any[]) => {
      this.initialProductsCount = products.length;
      console.log('initialProductsCount:', this.initialProductsCount);
    });;
  }
  getRoute(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('path:', this.activatedRoute.snapshot.firstChild?.routeConfig?.path);
      this.isEditPage = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'edit-product/:id';
      this.isViewPage = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'view-product/:id';
      this.isWalletPage = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'wallet';
      this.isDashboard = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'dashboard';
    });
  }
  listenForNewProducts(): void {
    this.apiService.getNewProductAdded().subscribe(() => {
      if (this.userLoggedIn) {
        const isOnDashboardPage = this.router.url.includes('dashboard');
        if (isOnDashboardPage && this.productAddedSinceLogin) {
          this.showProductAlert();
        } else if (!isOnDashboardPage && this.productAddedSinceLogin) {
          this.showProductAlertNoDash();
        }
        this.productAddedSinceLogin = true;
      }
    });
  }
  showProductAlert(): void {
    this.snackBar.open('A new product has been added.', 'Close', {
      duration: 5000,
    });
  }
  showProductAlertNoDash(): void {
    this.snackBar.open('A new product has been added, kindly check the dashboard page.', 'Close', {
      duration: 5000,
    });
  }
}
