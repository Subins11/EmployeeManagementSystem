import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LeaveRequest } from '../models/leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

// Posting Leave Request to JSON Server

  submitLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, request)
      .pipe(
        catchError(error => {
          console.error('Error submitting leave request:', error);
          return throwError(error);
        })
      );
  }

// Get Request

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

//  Request Approval

approveLeaveRequest(leaveRequestId:number): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${leaveRequestId}`,
  {status: 'Approved'});
}

  //  Request Rejection

rejectLeaveRequest(leaveRequestId: number) : Observable<any> {
  return this.http.patch(`${this.apiUrl}/${leaveRequestId}`,{
    status:'Rejected'});
}

}