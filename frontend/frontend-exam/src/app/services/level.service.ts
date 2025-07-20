import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LevelDto } from '../dtos/level.dto';

@Injectable({ providedIn: 'root' })
export class LevelService {
  private apiUrl = 'http://localhost:8088/api/v1/levels';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LevelDto[]> {
    return this.http.get<LevelDto[]>(this.apiUrl);
  }
}
