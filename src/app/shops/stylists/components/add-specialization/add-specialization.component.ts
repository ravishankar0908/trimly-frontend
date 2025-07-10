import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationModel } from '../../models/addSpecialization.model';
import { SpecializationService } from '../../service/specialization.service';
import { ToastrService } from 'ngx-toastr';
import { ListSpecializationComponent } from '../list-specialization/list-specialization.component';

@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss'],
})
export class AddSpecializationComponent implements OnInit {
  specialization!: FormGroup;
  decodedToken: any = '';
  @ViewChild(ListSpecializationComponent)
  listComponent!: ListSpecializationComponent;

  constructor(
    private formBuilder: FormBuilder,
    private specializationService: SpecializationService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFormData();
  }

  private getFormData() {
    this.specialization = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.specialization.invalid) {
    } else {
      this.specializationService
        .insertSpecialization(this.specialization.value as SpecializationModel)
        .subscribe({
          next: (res) => {
            this.handleSuccess(res);
          },
          error: (err) => {},
        });
    }
    this.specialization.reset();
    this.removeErrors();
    this.getFormData();
  }

  removeErrors() {
    Object.keys(this.specialization.controls).forEach((key) => {
      this.specialization.get(key)?.setErrors(null);
    });
  }

  handleSuccess(res: any) {
    this.toaster.success(res.message, 'created');
    this.listComponent.refreshData();
  }
}
