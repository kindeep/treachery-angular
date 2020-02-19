import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForensicDeckComponent } from './forensic-deck.component';

describe('ForensicDeckComponent', () => {
  let component: ForensicDeckComponent;
  let fixture: ComponentFixture<ForensicDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForensicDeckComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForensicDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
