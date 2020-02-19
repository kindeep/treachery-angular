import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigatorComponent } from './investigator.component';

describe('InvestigatorComponent', () => {
  let component: InvestigatorComponent;
  let fixture: ComponentFixture<InvestigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
