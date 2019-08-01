import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(public http: HttpClient) { }

  login(formData){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post(`${environment.apiUrl}login`,formData,options)
  }

  getAllList(){
    let id = JSON.parse(localStorage.getItem('user-data'))._id
    return this.http.get(`${environment.apiUrl}get/${id}`)
  }

  onAddData(formData){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post(`${environment.apiUrl}add-details`,formData,options)
  }

  onEditData(values){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post(`${environment.apiUrl}update`,values,options)
  }

  onDelete(id){
    return this.http.get(`${environment.apiUrl}delete/${id}`)
  }
}
