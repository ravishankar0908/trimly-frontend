import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStylistsComponent } from './list-stylists.component';

describe('ListStylistsComponent', () => {
  let component: ListStylistsComponent;
  let fixture: ComponentFixture<ListStylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStylistsComponent]
    });
    fixture = TestBed.createComponent(ListStylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
