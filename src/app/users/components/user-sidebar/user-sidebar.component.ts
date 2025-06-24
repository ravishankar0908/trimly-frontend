import { Component } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss'],
})
export class UserSidebarComponent {
  sideBarMenu = [
    {
      iconName: 'account_circle',
      menuName: 'Profile',
      path: '../users/profile',
    },
    {
      iconName: 'dashboard',
      menuName: 'Dashboard',
      path: '../users/dashboard',
    },

    {
      iconName: 'shop',
      menuName: 'Shop Details',
      path: '../users/shopdetails',
    },
  ];
}
