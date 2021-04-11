import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedataService } from './../../../../../shared/services/sharedata.service';

@Component({
  selector: 'app-review-transfer',
  templateUrl: './review-transfer.component.html',
  styleUrls: ['./review-transfer.component.scss']
})
export class ReviewTransferComponent implements OnInit, OnDestroy {

  @Input() isFormValid;
  $destroy: Subject<boolean> = new Subject<boolean>();

  reviewTransferModalIsOpen : boolean = false;
  toAccount: string;
  account: any;

  constructor( private sharedataService: SharedataService ) { }

  ngOnInit(): void {
    this.sharedataService.showReviewTransfer
        .pipe(takeUntil(this.$destroy))
        .subscribe( resp => {
          if(resp){
            this.isOpenModal(resp);
            this.toAccount = this.sharedataService.getToAccount();
            this.account = this.sharedataService.getAccount();
          }
        });

  }

  isOpenModal(open : boolean) : void {
    this.reviewTransferModalIsOpen = open;
  }

  triggerSendTransfer(): void {
    this.isOpenModal(false);
    this.sharedataService.notifySendTransfer.next(true);
  }

  ngOnDestroy() {
    this.$destroy.unsubscribe();
  }

}
