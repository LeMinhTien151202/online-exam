import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dtos/user.dto';
import { UserRegisterDto } from 'src/app/dtos/uer.register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.error = '';

    // Kiểm tra mật khẩu xác nhận
    if (this.password !== this.confirmPassword) {
      this.error = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    // Kiểm tra thông tin bắt buộc
    if (!this.username || !this.email || !this.password) {
      this.error = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }

    this.userService.getAll().subscribe({
      next: (users: UserDto[]) => {
        // Kiểm tra username đã tồn tại
        const existingUser = users.find(u => u.userName === this.username);
        if (existingUser) {
          this.error = 'Tên đăng nhập đã tồn tại!';
          return;
        }

        // Tạo user mới
        const newUser: UserRegisterDto = {
          roleId: 2, // User thường
          userName: this.username,
          email: this.email,
          phone: '',
          password: this.password
        };

        this.userService.create(newUser).subscribe({
          next: (user) => {
            // Đăng ký thành công, chuyển đến trang đăng nhập
            this.router.navigate(['/login']);
          },
          error: () => {
            this.error = 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!';
          }
        });
      },
      error: () => {
        this.error = 'Lỗi kết nối máy chủ!';
      }
    });
  }
}
