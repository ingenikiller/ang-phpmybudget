import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionPrevisionEnteteListeComponent } from './edition-prevision-entete-liste.component';

describe('EditionPrevisionEnteteListeComponent', () => {
  let component: EditionPrevisionEnteteListeComponent;
  let fixture: ComponentFixture<EditionPrevisionEnteteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionPrevisionEnteteListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionPrevisionEnteteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
