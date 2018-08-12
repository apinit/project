import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DormitoryDetailComponent } from './dormitory-detail.component';

describe('DormitoryDetailComponent', () => {
  let component: DormitoryDetailComponent;
  let fixture: ComponentFixture<DormitoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DormitoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DormitoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
