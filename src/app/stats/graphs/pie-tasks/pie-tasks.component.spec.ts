import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieTasksComponent } from './pie-tasks.component';

describe('PieTasksComponent', () => {
  let component: PieTasksComponent;
  let fixture: ComponentFixture<PieTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
