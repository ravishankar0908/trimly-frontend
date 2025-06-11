import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  displayName: string | null = '';
  ngOnInit(): void {
    this.displayName = localStorage.getItem('role') || null;
  }
}
