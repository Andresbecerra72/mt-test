import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() data!: Response;

  values = [];
  page = [];

  constructor() {}

  ngOnChanges(changes: SimpleChange) {
    const { currentValue } = changes['data'];
    //console.log('Changes: ', currentValue?.rates);

    if (currentValue?.rates) {
      for (let clave in currentValue.rates) {
        const item = {
          type: clave,
          value: currentValue.rates[clave],
        };
        this.values.push(item);
        //console.log(currentValue.rates[clave]);
      }
      this.page = this.values.slice(0, 5);
    }
  }

  ngOnInit() {
    console.log(this.data);
  }

  setData(data) {
    this.page = data;
  }
}
