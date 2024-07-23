import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NO_ERRORS_SCHEMA } from '@angular/core';
 import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { HomeComponent } from './home/home.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
// import { SellerComponent } from './customer/seller/seller.component';
// import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
// import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { ProductCrudComponent } from './product/product-crud/product-crud.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CategoryComponent } from './category/category.component';
import { MaterialModule } from './material.module';
import { SingleProductComponent } from './category/single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DialogCartComponent } from './cart/dialog-cart/dialog-cart.component';


// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent, FooterComponent, HomeComponent, AdminDashboardComponent, AdminLoginComponent, UserCrudComponent,
      SigninSignupComponent, CheckoutComponent, 
      ProductCrudComponent, AboutusComponent, CategoryComponent, SingleProductComponent, CartComponent,CheckoutComponent, DialogCartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule
   

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
