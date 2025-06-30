import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sideBarMenu = [
    { iconName: 'home', menuName: 'Dashboard', path: '../shops/dashboard' },
    {
      iconName: 'account_circle',
      menuName: 'Profile',
      path: '../shops/profile',
    },
    { iconName: 'booking', menuName: 'Bookings', path: '../shops/bookings' },
    {
      iconName: 'add',
      menuName: 'Add Stylist',
      path: '../shops/stylist',
    },
    {
      iconName: 'add',
      menuName: 'Add Specialization',
      path: '../shops/stylist/specialization',
    },
  ];
}
