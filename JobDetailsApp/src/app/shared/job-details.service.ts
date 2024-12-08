import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { JobDetail } from './job-details.model';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsService {
  private apiUrl = `${environment.apiBaseUrl}/api/JobDetails`;

  constructor(private http: HttpClient) { }

  getJobDetails(): Observable<JobDetail[]> {
    return this.http.get<JobDetail[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getJobDetailById(id: number): Observable<JobDetail> {
    return this.http.get<JobDetail>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createJobDetail(jobDetail: JobDetail): Observable<JobDetail> {
    return this.http.post<JobDetail>(this.apiUrl, jobDetail).pipe(
      catchError(this.handleError)
    );
  }

  updateJobDetail(id: number, jobDetail: JobDetail): Observable<JobDetail> {
    return this.http.put<JobDetail>(`${this.apiUrl}/${id}`, jobDetail).pipe(
      catchError(this.handleError)
    );
  }

  deleteJobDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
