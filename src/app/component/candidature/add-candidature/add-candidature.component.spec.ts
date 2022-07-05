import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidatureComponent } from './add-candidature.component';

describe('AddCandidatureComponent', () => {
  let component: AddCandidatureComponent;
  let fixture: ComponentFixture<AddCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCandidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
