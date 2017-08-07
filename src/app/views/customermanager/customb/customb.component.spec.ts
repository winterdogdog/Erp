import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustombComponent } from './customb.component';

describe('CustombComponent', () => {
  let component: CustombComponent;
  let fixture: ComponentFixture<CustombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustombComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
