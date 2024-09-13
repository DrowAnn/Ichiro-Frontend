import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadasLaboralesComponent } from './jornadas-laborales.component';

describe('JornadasLaboralesComponent', () => {
  let component: JornadasLaboralesComponent;
  let fixture: ComponentFixture<JornadasLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JornadasLaboralesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JornadasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
