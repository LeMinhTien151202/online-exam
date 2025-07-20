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

  update(id: number, exam: ExamDto): Observable<ExamDto> {
    return this.http.put<ExamDto>(`${this.apiUrl}/${id}`, exam);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
