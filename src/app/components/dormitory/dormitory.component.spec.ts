import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DormitoryComponent } from './dormitory.component';

describe('DormitoryComponent', () => {
  let component: DormitoryComponent;
  let fixture: ComponentFixture<DormitoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DormitoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DormitoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
