import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchstyleComponent } from './searchstyle.component';

describe('SearchstyleComponent', () => {
  let component: SearchstyleComponent;
  let fixture: ComponentFixture<SearchstyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchstyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchstyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
