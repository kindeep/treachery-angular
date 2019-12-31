import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDeckPagerComponent } from './player-deck-pager.component';

describe('PlayerDeckPagerComponent', () => {
  let component: PlayerDeckPagerComponent;
  let fixture: ComponentFixture<PlayerDeckPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDeckPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDeckPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
