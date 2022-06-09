import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import { map, delay, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private http: HttpClient,
  ) { }

  async getData(url: string) {
    return await this.http.get(url).pipe(delay(100), retry(3)).toPromise();
  }
}
