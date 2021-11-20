import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeoperationsComponent } from './listeoperations.component';

describe('ListeoperationsComponent', () => {
  let component: ListeoperationsComponent;
  let fixture: ComponentFixture<ListeoperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeoperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeoperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
