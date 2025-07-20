import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultDto } from '../dtos/result.dto';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private apiUrl = 'http://localhost:8088/api/v1/results';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ResultDto[]> {
    return this.http.get<ResultDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<ResultDto> {
    return this.http.get<ResultDto>(`${this.apiUrl}/${id}`);
  }

  create(result: ResultDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(this.apiUrl, result);
  }

  update(id: number, result: ResultDto): Observable<ResultDto> {
    return this.http.put<ResultDto>(`${this.apiUrl}/${id}`, result);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
