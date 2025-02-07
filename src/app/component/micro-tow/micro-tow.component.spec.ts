import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroTowComponent } from './micro-tow.component';

describe('MicroTowComponent', () => {
  let component: MicroTowComponent;
  let fixture: ComponentFixture<MicroTowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroTowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroTowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
