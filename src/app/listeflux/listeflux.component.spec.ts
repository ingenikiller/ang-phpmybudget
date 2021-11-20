import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListefluxComponent } from './listeflux.component';

describe('ListefluxComponent', () => {
  let component: ListefluxComponent;
  let fixture: ComponentFixture<ListefluxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListefluxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListefluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
