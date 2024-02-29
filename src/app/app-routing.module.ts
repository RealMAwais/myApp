import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './dashboard/view-product/view-product/view-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { AuthGuard } from './shared/auth.guard';
import { WalletComponent } from './dashboard/wallet/wallet/wallet.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'view-product/:id', component: ViewProductComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
