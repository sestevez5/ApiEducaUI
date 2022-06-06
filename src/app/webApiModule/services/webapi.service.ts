import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  constructor(private http: HttpClient) {
    http.get('../assets/json/webapiPre.json').subscribe(dato=> {

      const x=Object.values(dato);

      console.log(x[4].schemas);
   }
    )
}
}
