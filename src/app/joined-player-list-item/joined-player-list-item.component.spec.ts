import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedPlayerListItemComponent } from './joined-player-list-item.component';

describe('JoinedPlayerListItemComponent', () => {
  let component: JoinedPlayerListItemComponent;
  let fixture: ComponentFixture<JoinedPlayerListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedPlayerListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedPlayerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
