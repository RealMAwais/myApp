import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  isUserAuthenticated: boolean = false;
  isForgetPassword: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(event.url);
        const segments = urlTree.root.children.primary?.segments.map(segment => segment.path);
        if (!this.isUserAuthenticated && this.isProtectedRoute(segments)) {
          alert('You are not authorized. Please sign in.');
          console.warn('Unauthorized access attempted:', event.url);
          this.router.navigate(['/signin']);
        }
      }
    });
    this.authService.isUserAuthenticated().subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;

    });    
  }
  isProtectedRoute(segments: string[] | undefined): boolean {
    const protectedRoutes = ['dashboard', 'edit-product/:id', 'view-product/:id'];
    return segments?.some(segment => protectedRoutes.includes(segment)) || false;
  }
  getRoute(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isForgetPassword = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'forget-password';
    });
  }
}
