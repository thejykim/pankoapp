import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineHabitsComponent } from './line-habits.component';

describe('LineHabitsComponent', () => {
  let component: LineHabitsComponent;
  let fixture: ComponentFixture<LineHabitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineHabitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
