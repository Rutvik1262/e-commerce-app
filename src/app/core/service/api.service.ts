import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 /* using this was getting this error application generation failed
  The last overload gave the following error.
  Type '{ header: HttpHeaders; }' has no properties in common with type '{ headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefi
 ned; observe?: "body" | undefined; params?: HttpParams | { ...; } | undefined; reportProgress?: boolean | undefined; responseType?: "json" | undefined; withCredentials?: boolean | undef ined; transferCache?: ...'. [plugin angular-compiler]
  httpOptions ={
  header : new HttpHeaders({
    "content-type": "application/json",
    "Access-Control-Allow-Origin" : "*"
  })
 }*/

 httpOptions = { headers: new HttpHeaders()
 .set('Content-Type', 'application/json')
 .set('Access-Control-Allow-Origin', '*') };

  constructor(private http:HttpClient) { }

  private formatErrors(error: any){
    return throwError(error.error)
  }
  get(path:string, params:HttpParams = new HttpParams()):Observable<any>{
    return this.http.get(path,{params}).pipe(catchError(this.formatErrors))
  }
  put(path:string, body:object ={}): Observable<any>{
    return this.http.put(path,JSON.stringify(body), this.httpOptions).pipe(catchError
    (this.formatErrors))
  }
  post(path:string, body:object ={}): Observable<any>{
    return this.http.post(path, JSON.stringify(body), this.httpOptions).pipe(catchError
    (this.formatErrors))
  }
  delete(path:string): Observable<any>{
    return this.http.delete(path).pipe(catchError(this.formatErrors))
  }
}
