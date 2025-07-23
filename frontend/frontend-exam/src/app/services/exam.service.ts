import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamDto } from '../dtos/exam.dto';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private apiUrl = 'http://localhost:8088/api/v1/exams';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ExamDto[]> {
    return this.http.get<ExamDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<ExamDto> {
    return this.http.get<ExamDto>(`${this.apiUrl}/${id}`);
  }

  create(exam: ExamDto): Observable<ExamDto> {
    return this.http.post<ExamDto>(this.apiUrl, exam);
  }

  createWithImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  update(id: number, exam: ExamDto): Observable<ExamDto> {
    return this.http.put<ExamDto>(`${this.apiUrl}/${id}`, exam);
  }
  updateWithImage(id: number, formData: FormData) {
  return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
