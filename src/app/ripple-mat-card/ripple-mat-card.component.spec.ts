import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleMatCardComponent } from './ripple-mat-card.component';

describe('RippleMatCardComponent', () => {
  let component: RippleMatCardComponent;
  let fixture: ComponentFixture<RippleMatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RippleMatCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RippleMatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
