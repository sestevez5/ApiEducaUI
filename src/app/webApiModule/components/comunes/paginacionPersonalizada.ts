import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class PaginacionPersonalizada implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel: 'Primera página'
  itemsPerPageLabel = `Número de páginas:`;
  lastPageLabel = `Última página`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Página posterior';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}
