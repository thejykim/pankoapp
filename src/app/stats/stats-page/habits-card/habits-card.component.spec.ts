import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsCardComponent } from './habits-card.component';

describe('HabitsCardComponent', () => {
  let component: HabitsCardComponent;
  let fixture: ComponentFixture<HabitsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
