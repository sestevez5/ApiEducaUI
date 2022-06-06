import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  constructor(private http: HttpClient) {
    http.get('../assets/json/webapiPre.json').subscribe(dato=> {

    
for(const [key, value] of Object.entries(dato)){

  if (key==='paths') {
  console.log(value)
  }
}
        
      }
    

      
   
    )
}
}
