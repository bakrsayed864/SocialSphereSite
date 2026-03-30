import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManinLayoutComponent } from './manin-layout.component';

describe('ManinLayoutComponent', () => {
  let component: ManinLayoutComponent;
  let fixture: ComponentFixture<ManinLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManinLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManinLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
