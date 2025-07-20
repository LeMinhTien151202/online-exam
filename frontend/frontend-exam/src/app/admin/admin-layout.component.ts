import { Component } from '@angular/core';
@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  viewProfile() {
    // Chuyển hướng đến trang profile admin hoặc hiển thị modal
    alert('Thông tin admin!');
  }

  logout() {
    // Xử lý đăng xuất
    alert('Đăng xuất thành công!');
  }
}
