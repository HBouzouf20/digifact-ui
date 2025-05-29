import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagStatusComponent } from './tag-status.component';

describe('TagStatusComponent', () => {
  let component: TagStatusComponent;
  let fixture: ComponentFixture<TagStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
