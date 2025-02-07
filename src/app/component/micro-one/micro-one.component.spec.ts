import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroOneComponent } from './micro-one.component';

describe('MicroOneComponent', () => {
  let component: MicroOneComponent;
  let fixture: ComponentFixture<MicroOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
