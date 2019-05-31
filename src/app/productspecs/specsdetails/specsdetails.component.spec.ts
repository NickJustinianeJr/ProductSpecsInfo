import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecsdetailsComponent } from './specsdetails.component';

describe('SpecsdetailsComponent', () => {
  let component: SpecsdetailsComponent;
  let fixture: ComponentFixture<SpecsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
