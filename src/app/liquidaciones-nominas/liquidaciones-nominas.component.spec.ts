import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionesNominasComponent } from './liquidaciones-nominas.component';

describe('LiquidacionesNominasComponent', () => {
  let component: LiquidacionesNominasComponent;
  let fixture: ComponentFixture<LiquidacionesNominasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidacionesNominasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidacionesNominasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
