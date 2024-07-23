import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCrudComponent } from './product/product-crud/product-crud.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CategoryComponent } from './category/category.component';
import { SingleProductComponent } from './category/single-product/single-product.component';
import { CartComponent } from './cart/cart.component';

// import { CartResolver } from './home/cart.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SigninSignupComponent },
  { path: 'sign-up', component: SigninSignupComponent },
  // {
  //   path: '',
  //   children: [
  //     { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  //     { path: 'checkout', component: CheckoutComponent },
  //   ],
  // },

  // {
  //   path: '',
  //   children: [
  //     { path: 'seller-dashboard', component: SellerComponent },
  //     { path: 'seller/product', component: ProductCrudComponent },
  //   ],
  // },

  //Path/component you want to access before admin login/signin
  {
    path: '',
    children: [{ path: 'admin-login', component: AdminLoginComponent }],
  },
  //Path/component you want to access after admin login/signin
  {
    path: '',
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'admin/user', component: UserCrudComponent },
      { path: 'admin/product', component: ProductCrudComponent },
    ],
  },

  {
    path: '',
    children: [{ path: 'aboutus', component: AboutusComponent }],
  },
  {
    path: '',
    children: [{ path: 'cart', component: CartComponent }],
  },
  {
    path: '',
    children: [{ path: 'checkout', component: CheckoutComponent }],
  },
  {
    path: 'category',
    children: [
      { path: ':name', component: CategoryComponent },
      { path: ':name/:id', component: SingleProductComponent },
    ],
  },

  // { path: 'my-profile', component: UserProfileComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
