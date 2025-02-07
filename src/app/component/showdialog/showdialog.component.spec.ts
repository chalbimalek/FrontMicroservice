import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdialogComponent } from './showdialog.component';

describe('ShowdialogComponent', () => {
  let component: ShowdialogComponent;
  let fixture: ComponentFixture<ShowdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
