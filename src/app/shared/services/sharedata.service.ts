import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  public showReviewTransfer: BehaviorSubject<any> = new BehaviorSubject(null);
  public notifySendTransfer: BehaviorSubject<any> = new BehaviorSubject(null);
  toAccount: string;
  account: any;

  constructor() { }

  setReviewTransfer(data: any) {
    this.showReviewTransfer.next(data);
  }

  getToAccount(){
    return this.toAccount;
  }

  setToAccount( descToAccount: string ){
    this.toAccount = descToAccount;
  }

  getAccount(){
    return this.account;
  }

  setAccount( descAccount: any ){
    this.account = descAccount;
  }

}
