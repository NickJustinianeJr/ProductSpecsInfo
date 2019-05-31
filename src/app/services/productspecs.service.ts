import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ProductSpecsByCategory, ProductSpecsCategory, ProductSpecs, ProductSpecsSearchResult } from '../models/productspecs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 


@Injectable({ providedIn: 'root' })
export class ProductSpecsService {

  private productsUrl = 'http://172.16.94.71:8082/api/products';
  

  constructor(
    private http: HttpClient) { }

  searchProductSpecs (searchText: string): Observable<ProductSpecsByCategory> {
    const searchUrl = this.productsUrl + "/searchproducts/" + searchText;
    
    console.log("searchUrl: " + searchUrl);

    return this.http.get<ProductSpecsByCategory>(searchUrl);
  }

  searchProductSpecsByStyleId (styleId: string): Observable<ProductSpecsByCategory> {
    const styleUrl = this.productsUrl + "/searchproducts/style/" + styleId;
    console.log("styleUrl: " + styleUrl);

    return this.http.get<ProductSpecsByCategory>(styleUrl);
  }


  /** GET employees from the server */
  // getEmployees (): Observable<ProductSpecs[]> {
  //   return this.http.get<ProductSpecs[]>(this.usersUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched employees')),
  //       catchError(this.handleError('getEmployees', []))
  //     );
  // }

  getProductSpecsForDisplay (id: string): Observable<ProductSpecsByCategory> {
    return this.http.get<ProductSpecsByCategory>(this.productsUrl + "/" + "fordisplay/" + id);
  }

  getProductSpecsById (id: string): Observable<ProductSpecsByCategory> {
    return this.http.get<ProductSpecsByCategory>(this.productsUrl + "/" + id);
  }

  getProductSpecsByStyleId (seasonId: string, styleId: string, sampleStage: string): Observable<ProductSpecsByCategory> {
    return this.http.get<ProductSpecsByCategory>( this.productsUrl + 
      "/season/" + seasonId + 
      "/style/" + styleId + 
      "/samplestage/" + sampleStage);
  }

  getProductSpecs (searchText: string = ""): Observable<ProductSpecs[]> {

    let searchUrl = this.productsUrl + "/productspecs";
    
    console.log(searchUrl);

    return this.http.get<ProductSpecs[]>(searchUrl)
      .pipe(
        tap(_ => this.log('fetched Product Specs')),
        catchError(this.handleError('getProductSpecs', []))
      );
  }

  getImageAttachment(recId: string): Observable<Blob> {
    let searchUrl = this.productsUrl + "/attachments/" + recId;

    return this.http.get<Blob>(searchUrl);
  }

//    /** GET employees from the server */
//    getTeams (): Observable<Team[]> {
//     return this.http.get<Team[]>(this.usersUrl + "/getteams")
//       .pipe(
//         tap(_ => this.log('fetched Teams')),
//         catchError(this.handleError('getTeams', []))
//       );
//   }

//   getTiers (): Observable<Tier[]> {
//     return this.http.get<Tier[]>(this.usersUrl + "/gettiers")
//       .pipe(
//         tap(_ => this.log('fetched Tiers')),
//         catchError(this.handleError('getTiers', []))
//       );
//   }

//   getCompanies (): Observable<Client[]> {
//     return this.http.get<Client[]>(this.usersUrl + "/getcompanies")
//       .pipe(
//         tap(_ => this.log('fetched Client')),
//         catchError(this.handleError('getCompanies', []))
//       );
//   }

  

// /** POST: add a new hero to the server */
// addEmployee (employee: EmployeeRequest): Observable<EmployeeRequest> {
//   return this.http.post<EmployeeRequest>(this.usersUrl, employee, httpOptions).pipe(
//     tap(_ => this.log(`addedd employee id=${employee.userAccount.userName}`)),
//     catchError(this.handleError<EmployeeRequest>('addEmployee'))
//   );
// }


//  /** PUT: update the hero on the server */
//  updateEmployee (employee: Employee): Observable<any> {
//   return this.http.put(this.usersUrl, employee, httpOptions).pipe(
//     tap(_ => this.log(`updated employee id=${employee.userId}`)),
//     catchError(this.handleError<any>('updateEmployee'))
//   );
// }

//  /** DELETE: delete the hero from the server */
//  deleteHero (employee: Employee | string): Observable<Employee> {
//   const id = typeof employee === 'string' ? employee : employee.userId;
//   const url = `${this.usersUrl}/${id}`;

//   return this.http.delete<Employee>(url, httpOptions).pipe(
//     tap(_ => this.log(`deleted employee id=${id}`)),
//     catchError(this.handleError<Employee>('deleteEmployee'))
//   );
// }

/* GET heroes whose name contains search term */
// searchHeroes(term: string): Observable<Hero[]> {
//   if (!term.trim()) {
//     // if not search term, return empty hero array.
//     return of([]);
//   }
//   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//     tap(_ => this.log(`found heroes matching "${term}"`)),
//     catchError(this.handleError<Hero[]>('searchHeroes', []))
//   );
// }


      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log("EmployeeService: " + message);
  }



}
