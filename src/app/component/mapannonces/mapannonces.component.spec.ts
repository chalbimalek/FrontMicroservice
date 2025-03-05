import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapannoncesComponent } from './mapannonces.component';

describe('MapannoncesComponent', () => {
  let component: MapannoncesComponent;
  let fixture: ComponentFixture<MapannoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapannoncesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapannoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
