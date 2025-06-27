import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sideBarMenu = [
    { iconName: 'home', menuName: 'Home', path: '' },
    { iconName: 'account_circle', menuName: 'Profile', path: '' },
  ];
}
