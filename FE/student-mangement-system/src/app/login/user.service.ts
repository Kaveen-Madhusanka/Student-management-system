import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public login(userId: number,password: string){
    const queryParams = new HttpParams().set('userId',userId.toString()).set('password',password);
    return this.http.get<any>(environment.baseURL+"User/Login",{params:queryParams})
  }

  public Test(): Observable<any>{
    return this.http.get<any>(environment.baseURL+"User/Test");
  }
}
