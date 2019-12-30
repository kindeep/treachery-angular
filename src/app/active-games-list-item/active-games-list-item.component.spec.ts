import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveGamesListItemComponent } from './active-games-list-item.component';

describe('ActiveGamesListItemComponent', () => {
  let component: ActiveGamesListItemComponent;
  let fixture: ComponentFixture<ActiveGamesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveGamesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveGamesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
