import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraCruzComponent } from './cara-cruz.component';

describe('CaraCruzComponent', () => {
  let component: CaraCruzComponent;
  let fixture: ComponentFixture<CaraCruzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaraCruzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaraCruzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
