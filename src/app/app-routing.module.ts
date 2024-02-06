import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/dashbroad/admin.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthAuthor } from './guard/auth.author';
import { ManagerProductComponent } from './admin/manager-product/manager-product.component';
import { FormProduct } from './admin/dashbroad/formProduct.component';
import { ProductDetailComponent } from './admin/dashbroad/product-detail.component';
const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'order',
    title: 'order',
    component: OrderComponent,
  },
  {
    path: 'order-confirm',
    title: 'Confirm Order',
    component: OrderConfirmComponent,
  },

  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    title: 'ADMIN - MANAGER',
    component: AdminComponent,
    canActivate: [AuthAuthor],
  },
  {
    path: 'product-detail/:id',
    title: 'ProductDetail',
    component: DetailProductComponent,
  },
  {
    path: 'admin/product-detail/:id',
    title: 'Product Detail',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    title: 'Cart',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
  {
    path: 'admin/products',
    title: 'Manager Products',
    canActivate: [AuthAuthor],
    component: ManagerProductComponent,
  },
  {
    path: 'admin/formProduct',
    title: 'Add Product',
    canActivate: [AuthAuthor],
    component: FormProduct,
  },
  {
    path: '**',
    title: '404 - Page Not Found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
