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
          // Kiểm tra xem user có bị khóa không
          if (user.roleId === 3) {
            this.error = 'Tài khoản của bạn đã bị khóa! Vui lòng liên hệ admin.';
            return;
          }

          // Lưu thông tin user vào localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Kiểm tra role và chuyển hướng
          if (this.isAdmin(user)) {
            // Nếu là admin, chuyển đến trang admin
            this.router.navigate(['/admin']);
          } else {
            // Nếu là user thường, chuyển đến trang chủ
            this.router.navigate(['/']);
          }
        } else {
          this.error = 'Tên đăng nhập hoặc mật khẩu không đúng!';
        }
      },
      error: () => {
        this.error = 'Lỗi kết nối máy chủ!';
      }
    });
  }

  // Helper method để kiểm tra có phải Admin không
  isAdmin(user: UserDto): boolean {
    if (user.role) {
      return user.role.roleName.toLowerCase().includes('admin');
    }
    return user.roleId === 2; // roleId = 2 là Admin
  }
}
