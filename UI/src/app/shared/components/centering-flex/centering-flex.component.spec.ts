import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteringFlexComponent } from './centering-flex.component';

describe('CenteringFlexComponent', () => {
  let component: CenteringFlexComponent;
  let fixture: ComponentFixture<CenteringFlexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenteringFlexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenteringFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
