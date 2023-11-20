import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOfCategoriesComponent } from './management-of-categories.component';

describe('ManagementOfCategoriesComponent', () => {
  let component: ManagementOfCategoriesComponent;
  let fixture: ComponentFixture<ManagementOfCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementOfCategoriesComponent]
    });
    fixture = TestBed.createComponent(ManagementOfCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
