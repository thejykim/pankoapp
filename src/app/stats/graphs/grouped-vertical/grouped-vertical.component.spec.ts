import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedVerticalComponent } from './grouped-vertical.component';

describe('GroupedVerticalComponent', () => {
  let component: GroupedVerticalComponent;
  let fixture: ComponentFixture<GroupedVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
