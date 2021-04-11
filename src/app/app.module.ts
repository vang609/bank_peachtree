import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { HttpClientModule } from '@angular/common/http';

import { TransactionsService } from './modules/services/transactions.service';
import { SharedataService } from './shared/services/sharedata.service';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainContentComponent } from './modules/components/dashboard/main-content/main-content.component';
import { MakeTransferComponent } from './modules/components/dashboard/make-transfer/make-transfer.component';
import { TransactionListComponent } from './modules/components/dashboard/transaction-list/transaction-list.component';
import { ROUTES } from './app-routing.module';
import { LogoComponent } from './shared/components/logo/logo.component';
import { TransactionItemComponent } from './modules/components/dashboard/transaction-list/transaction-item/transaction-item.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FilterComponent } from './modules/components/dashboard/transaction-list/filter/filter.component';
import { SubmitButtonComponent } from './modules/components/dashboard/make-transfer/submit-button/submit-button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReviewTransferComponent } from './modules/components/dashboard/make-transfer/review-transfer/review-transfer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    FooterComponent,
    MainContentComponent,
    MakeTransferComponent,
    TransactionListComponent,
    TransactionItemComponent,
    NavbarComponent,
    FilterComponent,
    SubmitButtonComponent,
    ReviewTransferComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [
    TransactionsService,
    SharedataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
