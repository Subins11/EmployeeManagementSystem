import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }


  // Creating Employees List in the JSON server

  createEmployee(data: any): void {
    this.http.post(`${this.apiUrl}`, data).subscribe(
      (response) => {
        console.log('Create Employee Response:', response);
      },
      (error) => {
        console.error('Create Employee Error:', error);
      }
    );
  }

//Get Employees List

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => Object.values(data))
    );
  }

// Deleting the Data

  deleteEmployee(employeeId: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${employeeId}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error) => {
        console.error('Delete Employee Error:', error);
        return throwError(error);
      })
    );
  }

// Updating Data

 updateEmployee(employee : any): Observable <any> {
  const updateUrl = `${this.apiUrl}/${employee.id}`;
  return this.http.put(updateUrl,employee)
 }

// Set Employee Status

employeeStatus(id: number, status : boolean) : Observable<Employee> {
  const employee = { status };
  const url = `${this.apiUrl}/${id}`;
  return this.http.patch<Employee>(url,employee)
}
}