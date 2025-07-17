import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
})
export class BookDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder
  ) {}

  currDate = new Date();
  selectedDate!: Date;
  timeSlots: string[] = [];
  selectedTimeSlot!: string;
  stylistId: string = '';

  formData!: FormGroup;

  ngOnInit(): void {
    this.stylistId = this.data.id;
    this.getFormData();
  }

  getFormData() {
    this.formData = this.formbuilder.group({
      appoinmentDate: ['', Validators.required],
      appoinmentTime: ['', Validators.required],
    });
  }

  bookStylist(stylistId: any) {
    console.log(stylistId);
    console.log(this.formData.value);
  }

  ondateChange(event: any) {
    this.selectedDate = event.value;
    this.generateTimeSlots(this.selectedDate);
    this.selectedTimeSlot = '';
  }

  generateTimeSlots(date: Date) {
    const startHour = 9;
    const endHour = 18;
    const now = new Date();

    const slots: string[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const fromTime = new Date(date);
      fromTime.setHours(hour, 0, 0, 0);

      const toTime = new Date(date);
      toTime.setHours(hour + 1, 0, 0, 0);

      if (date.toDateString() === now.toDateString() && fromTime < now) {
        continue;
      }

      const slot = `${this.formatTime(fromTime)} - ${this.formatTime(toTime)}`;
      slots.push(slot);
    }

    this.timeSlots = slots;
  }

  formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12;
    return `${hour12}:${minutes} ${suffix}`;
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.generateTimeSlots(event.value);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
