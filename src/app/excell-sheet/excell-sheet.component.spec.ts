import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcellSheetComponent } from './excell-sheet.component';

describe('ExcellSheetComponent', () => {
  let component: ExcellSheetComponent;
  let fixture: ComponentFixture<ExcellSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcellSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcellSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
