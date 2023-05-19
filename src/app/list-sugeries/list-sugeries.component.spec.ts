import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSugeriesComponent } from './list-sugeries.component';

describe('ListSugeriesComponent', () => {
  let component: ListSugeriesComponent;
  let fixture: ComponentFixture<ListSugeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSugeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSugeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
