import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getCurrency(currency: string): Observable<Response> {
    const url = `https://api.apilayer.com/exchangerates_data/latest?base=${currency}&apikey=39jrNRtIo66AbMBFhdwWqcZ54J5cmrLy`;
    return this.http.get<Response>(url);
  }
}
