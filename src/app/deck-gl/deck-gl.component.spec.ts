import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckGlComponent } from './deck-gl.component';

describe('DeckGlComponent', () => {
  let component: DeckGlComponent;
  let fixture: ComponentFixture<DeckGlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckGlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckGlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
