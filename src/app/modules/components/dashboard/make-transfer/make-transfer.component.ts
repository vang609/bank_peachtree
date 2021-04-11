import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as constData  from './make-transfer.component.mockup'
import { SharedataService } from '../../../../shared/services/sharedata.service';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit, OnDestroy {

  makeTransferForm: FormGroup;
  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor( private fb: FormBuilder, private sharedataService: SharedataService ) { }

  headerTitle = 'Make Transfer';
  headerIconName = 'make-transfer-02.png';
  amoutAccount = 5824.76;
  placeholderFromAccount = constData.phFromAccount;
  placeholderToAccount = constData.phToAccount;
  placeholderAccount = constData.phAccount;
  formValid: boolean;


  ngOnInit(): void {
    this.formValid = false;
    this.placeholderFromAccount =  this.placeholderFromAccount+ this.amoutAccount;
    this.makeTransferForm = this.fb.group({
      fromAccount: [{value: '', disabled: true }, { validators: [Validators.required] }],
      toAccount: ['', { validators: [Validators.required] }],
      account: ['', { validators: [Validators.required] }]
    });

    this.makeTransferForm.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.formValid = this.makeTransferForm.valid && Number(this.amoutAccount) >= Number(this.makeTransferForm.get('account').value)? true : false;
      });

    this.sharedataService.notifySendTransfer
      .pipe(takeUntil(this.$destroy))
      .subscribe( resp => {
        if(resp){
          this.makeTransfer();
        }
      });

  }

  showModalTransfer(isOpenModal) {
    if(isOpenModal){
      this.sharedataService.setToAccount(this.makeTransferForm.get('toAccount').value);
      this.sharedataService.setAccount(this.makeTransferForm.get('account').value);
    }
    this.sharedataService.showReviewTransfer.next(isOpenModal);
  }

  makeTransfer(){
    this.placeholderFromAccount = '';
    this.makeTransferForm.get('toAccount').patchValue('');
    this.makeTransferForm.get('account').patchValue('');
    this.amoutAccount = Number(this.amoutAccount) - Number(this.sharedataService.getAccount());
    this.placeholderFromAccount =  constData.phFromAccount + this.amoutAccount
  }

  ngOnDestroy() {
    this.$destroy.unsubscribe();
  }

}

