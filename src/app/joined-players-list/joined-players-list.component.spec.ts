import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedPlayersListComponent } from './joined-players-list.component';

describe('JoinedPlayersListComponent', () => {
  let component: JoinedPlayersListComponent;
  let fixture: ComponentFixture<JoinedPlayersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedPlayersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedPlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
