import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-stylist',
  templateUrl: './add-stylist.component.html',
  styleUrls: ['./add-stylist.component.scss'],
})
export class AddStylistComponent implements OnInit {
  currentDate = new Date();

  dropdownItem: any[] = [
    'Hari Treatments',
    'Color Correction',
    'Ethnic Hair care',
    'Hair Extensions',
  ];
  selectedItem: any[] = [];
  dropdownSetting: IDropdownSettings = {};

  toppingList: string[] = [];
  ngOnInit(): void {}
}
