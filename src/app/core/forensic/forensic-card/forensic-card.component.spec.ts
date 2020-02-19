import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForensicCardComponent } from './forensic-card.component';

describe('ForensicCardComponent', () => {
  let component: ForensicCardComponent;
  let fixture: ComponentFixture<ForensicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForensicCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForensicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
