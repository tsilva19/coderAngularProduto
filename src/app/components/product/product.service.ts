import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean=false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(product: Product): Observable<Product> {
     return this.http.post<Product>(this.baseURL, product).pipe(
       map(obj => obj),
       catchError(e => this.handleError(e) )
     );
  }
  

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL).pipe(
      map(obj => obj),
      catchError(e => this.handleError(e) )
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.handleError(e) )
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseURL}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.handleError(e) )
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.handleError(e) )
    );
  }

  handleError(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro !!', true);
    return EMPTY
  }
}
