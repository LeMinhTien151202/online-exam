import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../dtos/user.dto';
import { UserRegisterDto } from '../dtos/uer.register.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8088/api/v1/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
  }

  create(user: UserRegisterDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.apiUrl, user);
  }

  update(id: number, user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
