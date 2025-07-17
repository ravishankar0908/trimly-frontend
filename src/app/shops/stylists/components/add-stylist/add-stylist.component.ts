import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SpecializationService } from '../../service/specialization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StylistService } from '../../service/stylist.service';
import { ToastrService } from 'ngx-toastr';
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
    private formBuilder: FormBuilder,
    private stylistService: StylistService,
    private toasterService: ToastrService
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
      this.stylistService.insertStylist(this.formData.value).subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => {},
      });
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

  handleSuccess(res: any) {
    console.log(res);
    this.toasterService.success(res.message, 'success');
  }
}
