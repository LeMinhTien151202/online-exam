import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false;

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    this.isLoggedIn = !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    window.location.reload();
  }
}
