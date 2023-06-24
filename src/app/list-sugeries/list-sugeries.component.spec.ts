import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSugeriesComponent } from './list-sugeries.component';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from '../login/login.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ApiService } from '../api.service';
import { of,throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('ListSugeriesComponent', () => {
  let component: ListSugeriesComponent;
  let fixture: ComponentFixture<ListSugeriesComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['fetchSurgeries']);

    await TestBed.configureTestingModule({
      declarations: [ListSugeriesComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSugeriesComponent);
    component = fixture.componentInstance;
  });

  it('should fetch surgeries on component initialization', () => {
    const mockSurgeries = [
      { id: 1, name: 'Surgery 1' },
      { id: 2, name: 'Surgery 2' },
      { id: 3, name: 'Surgery 3' }
    ];
    apiService.fetchSurgeries.and.returnValue(of(mockSurgeries));

    fixture.detectChanges();

    expect(apiService.fetchSurgeries).toHaveBeenCalled();
    expect(component.surgeries).toEqual(mockSurgeries);
  });

  it('should handle error when fetching surgeries', () => {
    const errorMessage = 'Internal Server Error';

    apiService.fetchSurgeries.and.returnValue(throwError(new Error(errorMessage)));

    fixture.detectChanges();

    expect(apiService.fetchSurgeries).toHaveBeenCalled();
    expect(component.surgeries).toEqual([]);
  });
});