import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'productlist/:id',
    loadChildren: () => import('./productlist/productlist.module').then( m => m.ProductlistPageModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'payment/:address',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'placeordersuccess',
    loadChildren: () => import('./placeordersuccess/placeordersuccess.module').then( m => m.PlaceordersuccessPageModule)
  },
  {
    path: 'placeorderfailed',
    loadChildren: () => import('./placeorderfailed/placeorderfailed.module').then( m => m.PlaceorderfailedPageModule)
  },
  {
    path: 'myorders',
    loadChildren: () => import('./myorders/myorders.module').then( m => m.MyordersPageModule)
  },
  {
    path: 'addnewaddress',
    loadChildren: () => import('./addnewaddress/addnewaddress.module').then( m => m.AddnewaddressPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'myaccount',
    loadChildren: () => import('./myaccount/myaccount.module').then( m => m.MyaccountPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
