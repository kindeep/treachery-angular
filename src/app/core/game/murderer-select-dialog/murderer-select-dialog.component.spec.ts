import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MurdererSelectDialogComponent } from './murderer-select-dialog.component';

describe('MurdererSelectDialogComponent', () => {
  let component: MurdererSelectDialogComponent;
  let fixture: ComponentFixture<MurdererSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MurdererSelectDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MurdererSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
