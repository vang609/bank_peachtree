import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';
import { Transaction } from './transaction.model';
import { SharedataService } from './../../../../shared/services/sharedata.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  constructor( private transactionsService: TransactionsService, private sharedataService: SharedataService) { }

  transactions: Transaction[] = [];
  transactionsBackup: Transaction[] = [];
  headerTitle = 'Transactions List';
  headerIconName = 'menu_001.png';
  $destroy: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.getTransactionsList();

    this.sharedataService.notifySendTransfer
    .pipe(takeUntil(this.$destroy))
    .subscribe( resp => {
      if(resp){
        this.addTransaction();
      }
    });
  }

  getTransactionsList(){
    // this.transactionsService.getTransactionsList()
    this.transactionsService.fetchTransactionsJSON()
      .subscribe( resp => {
        this.createTransactionObj(resp.data);
        // this.createTransactionObj(resp);
      });
  }

  createTransactionObj( resp: any){
    let transactionsArray: Transaction[] = [];
    resp.forEach(element => {
      const { dates: {valueDate}, merchant:{name}, transaction: {type, amountCurrency: {amount, currencyCode}} } = element;
      transactionsArray = [ {
                    transactionDate: this.getTransactionDate(new Date(valueDate)),
                    transactionMerchantName: name,
                    transactionType: type,
                    transactionAmount: amount,
                    transactionCurrencyCode: currencyCode
      }, ...transactionsArray ];

    });
    this.transactions = transactionsArray.sort((a, b) => b.transactionDate - a.transactionDate);
    this.transactionsBackup = [...this.transactions];
  }

  addTransaction(){
    const transactionObj = {
          transactionDate: new Date(),
          transactionMerchantName: this.sharedataService.getToAccount(),
          transactionType: 'Online Transfer',
          transactionAmount: this.sharedataService.getAccount(),
          transactionCurrencyCode: 'EUR'
    }
    this.transactions = [ transactionObj, ...this.transactions];
    this.transactions = this.transactions.sort((a, b) => b.transactionDate - a.transactionDate);
    this.transactionsBackup = [...this.transactions];
    this.sharedataService.notifySendTransfer.next(false);
  }

  getTransactionDate(valueDate: Date ){
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return new Date(months[valueDate.getMonth()] + ' ' + valueDate.getDate() + ', ' + valueDate.getFullYear());
  }

  searchByMerchantName(srcString) {
    if(srcString && srcString.length > 1){
      const matches = this.transactions.filter(s => s.transactionMerchantName.toUpperCase().includes(srcString.toUpperCase()));
      this.transactions = [...matches];
    } else {
      this.transactions = [...this.transactionsBackup];
    }
  }

  ngOnDestroy() {
    this.$destroy.unsubscribe();
  }

}
