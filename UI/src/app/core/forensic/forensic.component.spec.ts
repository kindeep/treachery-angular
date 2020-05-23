import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForensicComponent } from './forensic.component';

describe('ForensicComponent', () => {
  let component: ForensicComponent;
  let fixture: ComponentFixture<ForensicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForensicComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForensicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
