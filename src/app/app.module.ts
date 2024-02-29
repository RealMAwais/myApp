import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { productsComponent } from './dashboard/products/products.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar/sidebar.component';
import { ViewProductComponent } from './dashboard/view-product/view-product/view-product.component';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WalletComponent } from './dashboard/wallet/wallet/wallet.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchfilterPipe,
    NavbarComponent,
    productsComponent,
    DashboardComponent,
    SidebarComponent,
    ViewProductComponent,
    EditProductComponent,
    SignInComponent,
    SignUpComponent,
    ForgetPasswordComponent, 
    WalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
