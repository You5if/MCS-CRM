import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSnackbarComponent } from './new-snackbar.component';

describe('NewSnackbarComponent', () => {
  let component: NewSnackbarComponent;
  let fixture: ComponentFixture<NewSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
