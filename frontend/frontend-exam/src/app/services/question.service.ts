import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionDto } from '../dtos/question.dto';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private apiUrl = 'http://localhost:8088/api/v1/questions';

  constructor(private http: HttpClient) {}


  getAll(): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(this.apiUrl);
  }

  getByExamId(examId: number): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(`${this.apiUrl}/exam/${examId}`);
  }

  getById(id: number): Observable<QuestionDto> {
    return this.http.get<QuestionDto>(`${this.apiUrl}/${id}`);
  }

  create(question: QuestionDto): Observable<QuestionDto> {
    return this.http.post<QuestionDto>(this.apiUrl, question);
  }

  update(id: number, question: QuestionDto): Observable<QuestionDto> {
    return this.http.put<QuestionDto>(`${this.apiUrl}/${id}`, question);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
