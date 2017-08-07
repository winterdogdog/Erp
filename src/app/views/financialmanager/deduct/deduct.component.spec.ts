import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductComponent } from './deduct.component';

describe('DeductComponent', () => {
  let component: DeductComponent;
  let fixture: ComponentFixture<DeductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
