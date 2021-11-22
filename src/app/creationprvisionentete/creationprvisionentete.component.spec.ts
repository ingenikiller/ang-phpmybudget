import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationprvisionenteteComponent } from './creationprvisionentete.component';

describe('CreationprvisionenteteComponent', () => {
  let component: CreationprvisionenteteComponent;
  let fixture: ComponentFixture<CreationprvisionenteteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationprvisionenteteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationprvisionenteteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
