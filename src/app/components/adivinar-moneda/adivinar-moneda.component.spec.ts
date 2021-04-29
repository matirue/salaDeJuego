import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinarMonedaComponent } from './adivinar-moneda.component';

describe('AdivinarMonedaComponent', () => {
  let component: AdivinarMonedaComponent;
  let fixture: ComponentFixture<AdivinarMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdivinarMonedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinarMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
