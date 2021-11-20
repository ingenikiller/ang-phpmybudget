import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecomptesComponent } from './listecomptes.component';

describe('ListecomptesComponent', () => {
  let component: ListecomptesComponent;
  let fixture: ComponentFixture<ListecomptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListecomptesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListecomptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
