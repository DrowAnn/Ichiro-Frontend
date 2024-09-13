import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSociodemograficosComponent } from './datos-sociodemograficos.component';

describe('DatosSociodemograficosComponent', () => {
  let component: DatosSociodemograficosComponent;
  let fixture: ComponentFixture<DatosSociodemograficosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosSociodemograficosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosSociodemograficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
