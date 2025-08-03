
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dtos/user.dto';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserDto[] = [];
  error = '';
  success = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.error = 'Không thể tải dữ liệu người dùng!';
      }
    });
  }

  // Thay đổi quyền thành Admin
  makeAdmin(user: UserDto) {
    if (confirm(`Bạn có chắc muốn cấp quyền Admin cho ${user.userName}?`)) {
      const updatedUser = { ...user, roleId: 2 };
      // Tạm thời sử dụng userName làm identifier
      this.userService.update(user.userId, updatedUser).subscribe({
        next: () => {
          this.success = `Đã cấp quyền Admin cho ${user.userName}`;
          this.loadUsers(); // Reload danh sách
          setTimeout(() => this.success = '', 3000);
        },
        error: () => {
          this.error = 'Không thể cập nhật quyền người dùng!';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  // Thay đổi quyền thành User thường
  makeUser(user: UserDto) {
    if (confirm(`Bạn có chắc muốn hạ quyền ${user.userName} thành User thường?`)) {
      const updatedUser = { ...user, roleId: 1 };
      // Tạm thời sử dụng userName làm identifier
      this.userService.update(user.userId, updatedUser).subscribe({
        next: () => {
          this.success = `Đã hạ quyền ${user.userName} thành User thường`;
          this.loadUsers(); // Reload danh sách
          setTimeout(() => this.success = '', 3000);
        },
        error: () => {
          this.error = 'Không thể cập nhật quyền người dùng!';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  // Khóa người dùng
  lockUser(user: UserDto) {
    if (confirm(`Bạn có chắc muốn khóa tài khoản ${user.userName}?`)) {
      const updatedUser = { ...user, roleId: 3 };
      // Tạm thời sử dụng userName làm identifier
      this.userService.update(user.userId, updatedUser).subscribe({
        next: () => {
          this.success = `Đã khóa tài khoản ${user.userName}`;
          this.loadUsers(); // Reload danh sách
          setTimeout(() => this.success = '', 3000);
        },
        error: () => {
          this.error = 'Không thể khóa người dùng!';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  // Helper method để lấy tên quyền từ database
  getRoleName(user: UserDto): string {
    if (user.role) {
      // Sử dụng roleName từ database nếu có
      return user.role.roleName;
    }

    // Fallback dựa trên roleId
    switch (user.roleId) {
      case 1: return 'Admin';
      case 2: return 'User';
      case 3: return 'Locked';
      default: return 'Unknown';
    }
  }

  // Helper method để kiểm tra có phải Admin không
  isAdmin(user: UserDto): boolean {
    if (user.role) {
      return user.role.roleName.toLowerCase().includes('admin');
    }
    //ktra qua id xem cso phải í bằng 2 là quyen admin ko
    return user.roleId === 2;
  }

  // Helper method để kiểm tra có bị khóa không
  isLocked(user: UserDto): boolean {
    if (user.role) {
      return user.role.roleName.toLowerCase().includes('khoa');
    }
    return user.roleId === 3;
  }

  // Helper method để kiểm tra có phải User thường không
  isRegularUser(user: UserDto): boolean {
    if (user.role) {
      return user.role.roleName.toLowerCase().includes('user') &&
             !user.role.roleName.toLowerCase().includes('admin');
    }
    return user.roleId === 1;
  }

  // Helper method để lấy màu badge dựa trên quyền
  getRoleBadgeClass(user: UserDto): string {
    if (this.isAdmin(user)) return 'bg-primary';
    if (this.isLocked(user)) return 'bg-danger';
    if (this.isRegularUser(user)) return 'bg-success';
    return 'bg-secondary';
  }
}
