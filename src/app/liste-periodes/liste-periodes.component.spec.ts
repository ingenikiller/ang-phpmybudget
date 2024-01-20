import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePeriodesComponent } from './liste-periodes.component';

describe('ListePeriodesComponent', () => {
  let component: ListePeriodesComponent;
  let fixture: ComponentFixture<ListePeriodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePeriodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
