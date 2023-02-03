import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePrevisionsComponent } from './page-previsions.component';

describe('PagePrevisionsComponent', () => {
  let component: PagePrevisionsComponent;
  let fixture: ComponentFixture<PagePrevisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePrevisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePrevisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
