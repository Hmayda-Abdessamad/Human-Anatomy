import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOfOrgansComponent } from './management-of-organs.component';

describe('ManagementOfOrgansComponent', () => {
  let component: ManagementOfOrgansComponent;
  let fixture: ComponentFixture<ManagementOfOrgansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementOfOrgansComponent]
    });
    fixture = TestBed.createComponent(ManagementOfOrgansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
