import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SpecializationService } from '../../service/specialization.service';
@Component({
  selector: 'app-add-stylist',
  templateUrl: './add-stylist.component.html',
  styleUrls: ['./add-stylist.component.scss'],
})
export class AddStylistComponent implements OnInit {
  currentDate = new Date();

  dropdownItem: any[] = [];

  constructor(private specializationService: SpecializationService) {}

  ngOnInit(): void {
    this.getDropDown();
  }

  getDropDown() {
    this.specializationService.getListSpecialization().subscribe({
      next: (res) => {
        this.handleSuccess(res);
      },
    });
  }

  handleSuccess(res: any) {
    this.dropdownItem = res.data.map((items: any) => {
      return items.name;
    });
    console.log(this.dropdownItem);
  }
}
