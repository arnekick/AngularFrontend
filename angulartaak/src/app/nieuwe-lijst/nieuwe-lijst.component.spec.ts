import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuweLijstComponent } from './nieuwe-lijst.component';

describe('NieuweLijstComponent', () => {
  let component: NieuweLijstComponent;
  let fixture: ComponentFixture<NieuweLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieuweLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuweLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
