import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCompletaComponent } from './informacion-completa.component';

describe('InformacionCompletaComponent', () => {
  let component: InformacionCompletaComponent;
  let fixture: ComponentFixture<InformacionCompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionCompletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
