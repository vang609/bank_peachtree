import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  ENDPOINT_ASSETS = '../../../assets/json/mockdata/';
  SERVICE_ASSETS_PATH = this.ENDPOINT_ASSETS + 'transactions.json';

  getTransactionsURL( query: string ){
    const url = `https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/${ query })`;
    return this.http.get(url);
  }

  fetchTransactionsJSON(): Observable<any>{
      return this.http.get(this.SERVICE_ASSETS_PATH);
  }

  getTransactionsList(){
    return this.getTransactionsURL('transactions');
  }


}
