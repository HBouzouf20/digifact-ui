import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorDetailComponent } from './generator-detail.component';

describe('GeneratorDetailComponent', () => {
  let component: GeneratorDetailComponent;
  let fixture: ComponentFixture<GeneratorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratorDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
