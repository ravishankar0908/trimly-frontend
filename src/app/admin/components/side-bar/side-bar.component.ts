import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  sideBarMenu = [
    {
      iconName: 'account_circle',
      menuName: 'Profile',
      path: '../admin/profile',
    },
    {
      iconName: 'dashboard',
      menuName: 'Dashboard',
      path: '../admin/dashboard',
    },

    {
      iconName: 'person',
      menuName: 'Users',
    },

    {
      iconName: 'shop',
      menuName: 'Shop Details',
    },
  ];
}
