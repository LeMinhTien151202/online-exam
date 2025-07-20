import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleDto } from '../dtos/role.dto';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = 'http://localhost:8088/api/v1/roles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(this.apiUrl);
  }
}
