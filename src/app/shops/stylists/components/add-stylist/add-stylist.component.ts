import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SpecializationService } from '../../service/specialization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-stylist',
  templateUrl: './add-stylist.component.html',
  styleUrls: ['./add-stylist.component.scss'],
})
export class AddStylistComponent implements OnInit {
  currentDate = new Date();
  formData!: FormGroup;
  dropdownItem: any[] = [];

  constructor(
    private specializationService: SpecializationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDropDown();
    this.getFormData();
  }

  getFormData() {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      experience: ['', Validators.required],
      level: ['', Validators.required],
      specialization: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formData.invalid) {
    } else {
      console.log(this.formData.value);
      this.formData.reset();
    }
  }

  getDropDown() {
    this.specializationService.getListSpecialization().subscribe({
      next: (res) => {
        this.handleDropDownSuccess(res);
      },
    });
  }

  handleDropDownSuccess(res: any) {
    this.dropdownItem = res.data.map((items: any) => {
      return items.name;
    });
  }
}
