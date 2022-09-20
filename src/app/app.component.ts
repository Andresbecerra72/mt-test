import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  urlLogo =
    'https://www.moneytrans.eu/spain/wp-content/uploads/sites/26/2021/04/moneytrans-logo.svg';
  usdCurrencies: Response;
  eurCurrencies: Response;

  interval1: any;
  interval2: any;
  asyncData$ = new Observable<any>((observer: Observer<any>) => {
    this.interval1 = setInterval(() => {
      observer.next(this.getCurrencyUSD());
    }, 10000);
    this.interval2 = setInterval(() => {
      observer.next(this.getCurrencyEUR());
    }, 10000);
  });

  sub$ = new Subscription();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.sub$ = this.asyncData$.subscribe();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  getCurrencyUSD() {
    this.currencyService.getCurrency('USD').subscribe(
      (res) => {
        this.usdCurrencies = res;
        console.log(this.usdCurrencies);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getCurrencyEUR() {
    this.currencyService.getCurrency('EUR').subscribe(
      (res) => {
        this.eurCurrencies = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
