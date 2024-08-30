import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietIntakeComponent } from './diet-intake.component';

describe('DietIntakeComponent', () => {
  let component: DietIntakeComponent;
  let fixture: ComponentFixture<DietIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietIntakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
