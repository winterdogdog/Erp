import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomcComponent } from './customc.component';

describe('CustomcComponent', () => {
  let component: CustomcComponent;
  let fixture: ComponentFixture<CustomcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
