import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorTableComponent } from './generator-table.component';

describe('GeneratorTableComponent', () => {
  let component: GeneratorTableComponent;
  let fixture: ComponentFixture<GeneratorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratorTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
