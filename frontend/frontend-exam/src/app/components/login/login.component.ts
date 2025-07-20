import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dtos/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.userService.getAll().subscribe({
      next: (users: UserDto[]) => {
        const user = users.find(u => u.userName === this.username && u.password === this.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          this.error = 'Tên đăng nhập hoặc mật khẩu không đúng!';
        }
      },
      error: () => {
        this.error = 'Lỗi kết nối máy chủ!';
      }
    });
  }
}
