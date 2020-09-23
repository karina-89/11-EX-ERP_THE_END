import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialog,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import localeEs from '@angular/common/locales/es'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccountService } from './account/account.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LogInterceptorService } from './services/log-interceptor.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoginComponent } from './account/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersComponent } from './customers/customers.component';
import { CustomersFormComponent } from './customers/customers-form/customers-form.component';
import { CustomersModalComponent } from './customers/customers-modal/customers-modal.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesFormComponent } from './employees/employees-form/employees-form.component';
import { EmployeesModalComponent } from './employees/employees-modal/employees-modal.component';
import { ItemsComponent } from './items/items.component';
import { DeleteConfirmationComponent } from './home/delete-confirmation.component';
import { ItemsFormComponent } from './items/items-form/items-form.component';
import { ItemsModalComponent } from './items/items-modal/items-modal.component';
import { ItemscategoriesComponent } from './itemscategories/itemscategories.component';
import { ItemscategoriesFormComponent } from './itemscategories/itemscategories-form/itemscategories-form.component';
import { ItemscategoriesModalComponent } from './itemscategories/itemscategories-modal/itemscategories-modal.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { CustomersService } from './customers/customers.service';
import { OrdersService } from './orders/orders.service';
import { registerLocaleData } from '@angular/common';
import { EmployeesService } from './employees/employees.service';
import { ItemscategoriesService } from './itemscategories/itemscategories.service';
import { ItemsService } from './items/items.service';
import { OrderlinesService } from './orderlines/orderlines.service';

registerLocaleData(localeEs, 'es-ES');

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    CustomersComponent,
    CustomersFormComponent,
    CustomersModalComponent,
    EmployeesComponent,
    EmployeesFormComponent,
    EmployeesModalComponent,
    ItemsComponent,
    DeleteConfirmationComponent,
    ItemsFormComponent,
    ItemsModalComponent,
    ItemscategoriesComponent,
    ItemscategoriesFormComponent,
    ItemscategoriesModalComponent,
    OrdersComponent,
    OrdersFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuardService] },
      { path: 'customers-add', component: CustomersFormComponent, canActivate: [AuthGuardService] },
      { path: 'customers-edit/:id', component: CustomersFormComponent, canActivate: [AuthGuardService] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
      { path: 'orders-add', component: OrdersFormComponent, canActivate: [AuthGuardService] },
      { path: 'orders-edit/:id', component: OrdersFormComponent, canActivate: [AuthGuardService] },
      { path: 'items', component: ItemsComponent, canActivate: [AuthGuardService] },
      { path: 'items-add', component: ItemsFormComponent, canActivate: [AuthGuardService] },
      { path: 'items-edit/:id', component: ItemsFormComponent, canActivate: [AuthGuardService] },
      { path: 'items/item-modal', component: ItemsModalComponent, canActivate: [AuthGuardService] },
      { path: 'itemscategories', component: ItemscategoriesComponent, canActivate: [AuthGuardService] },
      { path: 'itemscategories-add', component: ItemscategoriesFormComponent, canActivate: [AuthGuardService] },
      { path: 'itemscategories-edit/:id', component: ItemscategoriesFormComponent, canActivate: [AuthGuardService] },
      { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuardService], data: { role: 'Admin' } },
      { path: 'employees-add', component: EmployeesFormComponent, canActivate: [AuthGuardService], data: { role: 'Admin' } },
      { path: 'employees-edit/:id', component: EmployeesFormComponent, canActivate: [AuthGuardService], data: { role: 'Admin' } },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [MatDialog, AccountService, AuthGuardService, CustomersService, OrdersService, EmployeesService, ItemscategoriesService, ItemsService, OrderlinesService, OrdersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'es-ES'
    }],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmationComponent, CustomersModalComponent, ItemscategoriesModalComponent, ItemsModalComponent, EmployeesModalComponent]
})
export class AppModule { }
