import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../Model/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly url ="https://localhost:7103/api/";
  constructor(private http: HttpClient) { }

  public getStudent(): Observable<any>{
    return this.http.get<any>(this.url+"Student/");
  }

  public getStudentById(studentId: number): Observable<any>{
    let queryParams = new HttpParams();
    queryParams.append('Id',studentId.toString());
    // return this.http.get<any>("https://localhost:7103/api/Student/GetStudentsById/",
    //   {params:queryParams});
    return this.http.get<any>(this.url+"Student/GetStudentsById/"+studentId);
  }

  public createStudent(student: Student): Observable<any>{
    return this.http.post<any>(this.url+"Student/",student);
  }

  public updateStudent(student: Student): Observable<any>{
    return this.http.put<any>(this.url+"Student/",student);
  }

  public deleteStudent(studentId: number){
    const queryParams = new HttpParams().set('id',studentId.toString());
    return this.http.delete<any>(this.url+"Student",{params:queryParams})
    //return this.http.delete<any>(this.url+"Student?studantId="+studentId)
  }
}
