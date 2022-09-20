import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TableComponent } from './table/table.component';



@NgModule({
  imports: [CommonModule],
  declarations: [TableComponent, PaginationComponent],
  exports: [TableComponent, PaginationComponent],
})
export class ComponentModule {}
