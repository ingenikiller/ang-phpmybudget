import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilstatistiquesComponent } from './acceuilstatistiques.component';

describe('AcceuilstatistiquesComponent', () => {
  let component: AcceuilstatistiquesComponent;
  let fixture: ComponentFixture<AcceuilstatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilstatistiquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilstatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
