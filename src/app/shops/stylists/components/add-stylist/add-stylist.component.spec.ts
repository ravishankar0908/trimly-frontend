import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStylistComponent } from './add-stylist.component';

describe('AddStylistComponent', () => {
  let component: AddStylistComponent;
  let fixture: ComponentFixture<AddStylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStylistComponent]
    });
    fixture = TestBed.createComponent(AddStylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
