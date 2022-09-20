import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @ViewChild('paginatior') paginator!: ElementRef;

  @Input() collection?: Array<any> | null = [];
  @Input() collectionSize: any;
  @Input() page: any;
  @Input() maxSize: number = 0;
  @Input() rotate: boolean = false;
  @Input() pageSize: number = 0;

  @Output() pageChange = new EventEmitter<any>();

  totalPages = 0;
  indexes: number[] = [];
  indexLimit = 3;
  pageItems: number[] = [];
  elements!: HTMLElement[];
  random = Math.floor(Math.random() * 1000);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { previousValue, currentValue } = changes?.collection;
    if (JSON.stringify(previousValue) !== JSON.stringify(currentValue)) {
      setTimeout(() => {
        console.log('Pagination');
        this.ngAfterViewInit();
      }, 0);
      this.paginationInit();
    }
  }

  ngOnInit(): void {
    //this.paginationInit();
  }

  ngAfterViewInit(): void {
    this.elements = this.paginator.nativeElement.querySelectorAll('li');
    this.pageSelected(this.elements[1]);
    this.setDisabled(0);
  }

  ngAfterViewChecked(): void {
    this.elements = this.paginator.nativeElement.querySelectorAll('li');
  }

  paginationInit() {
    this.totalPages = Math.ceil(this.collectionSize / this.pageSize);
    for (let i = 0; i < this.totalPages; i++) {
      this.indexes.push(i + 1);
    }
    this.indexLimit = this.maxSize;
    this.pageItems = this.indexes.slice(0, this.indexLimit);
  }

  pageSelected(item: HTMLElement) {
    if (!item) return;
    this.elements.forEach((el: HTMLElement) => {
      el.classList.remove('active');
    });
    item.classList.add('active');
    this.setDisabled(Number(item.innerText));
    this.pageChange.emit(
      this.setPageData(
        this.pageSize * Number(item.innerText) - this.pageSize,
        this.pageSize * Number(item.innerText)
      )
    );
  }

  next() {
    const itemActive =
      this.paginator.nativeElement.getElementsByClassName('active');
    if (itemActive.length == 0) return;
    const text = itemActive[0].innerText;
    this.setItemActive(`${Number(text) + 1}`);
    this.setDisabled(Number(text) + 1);
    this.newSegmentPages('next', text);
  }

  prev() {
    const itemActive =
      this.paginator.nativeElement.getElementsByClassName('active');
    if (itemActive.length == 0) return;
    const text = itemActive[0].innerText;
    this.setItemActive(`${Number(text) - 1}`);
    this.setDisabled(Number(text) - 2);
    this.newSegmentPages('prev', text);
  }

  setItemActive(condition: string) {
    this.elements.forEach((el: HTMLElement, i: number) => {
      if (el.innerText == condition) {
        this.pageSelected(el);
      }
    });
  }

  setDisabled(index: number) {
    if (this.collectionSize < this.pageSize) return;
    const prevEl = document.getElementById(`prevEl-${this.random}`);
    const nextEl = document.getElementById(`nextEl-${this.random}`);
    nextEl!.classList.remove('disabled');
    prevEl!.classList.remove('disabled');

    if (index == 0) {
      prevEl!.classList.add('disabled');
      this.rotate = true;
    }
    if (index == this.indexes[this.totalPages - 1]) {
      nextEl!.classList.add('disabled');
      this.rotate = false;
    }
  }

  newSegmentPages(mode: string, text: any) {
    switch (mode) {
      case 'next':
        if (this.pageItems[this.pageItems.length - 1] == text) {
          this.indexLimit = this.indexLimit + this.maxSize;
          this.pageItems = this.indexes.slice(Number(text), this.indexLimit);
          setTimeout(() => {
            this.setItemActive(`${Number(text) + 1}`);
          }, 0);
        }

        break;
      case 'prev':
        if (this.pageItems[0] == text) {
          this.indexLimit = this.indexLimit - this.maxSize;
          this.pageItems = this.indexes.slice(
            this.indexLimit - this.maxSize,
            this.indexLimit
          );
          setTimeout(() => {
            this.setItemActive(`${Number(text) - 1}`);
          }, 0);
        }

        break;

      default:
        break;
    }
  }

  setPageData(min: number, max: number) {
    this.page = this?.collection?.slice(min, max);
    return this.page;
  }
}
