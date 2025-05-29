import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorDetailAttributeComponent } from './generator-detail-attribute.component';

describe('GeneratorDetailAttributeComponent', () => {
  let component: GeneratorDetailAttributeComponent;
  let fixture: ComponentFixture<GeneratorDetailAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratorDetailAttributeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorDetailAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
