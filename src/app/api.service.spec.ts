import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch surgeries', () => {
    const mockSurgeries = [
      { id: 1, name: 'Surgery 1' },
      { id: 2, name: 'Surgery 2' },
      { id: 3, name: 'Surgery 3' }
    ];

    service.fetchSurgeries().subscribe((surgeries: any) => {
      expect(surgeries).toEqual(mockSurgeries);
    });

    const req = httpMock.expectOne('http://localhost:8080/viewAllSurgeries');
    expect(req.request.method).toBe('GET');
    req.flush(mockSurgeries);
  });

  it('should handle error when fetching surgeries', () => {
    const errorMessage = 'Internal Server Error';

    service.fetchSurgeries().subscribe(
      () => {
        fail('Expected the request to fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:8080/viewAllSurgeries');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'), {
      status: 500,
      statusText: errorMessage,
    });
  });

  it('should update assigned agent', () => {
    const mockData = { id: 1, assigned_agent: 'Agent1' };
    const mockResponse = { status: 'success' };

    service.updateAssignedAgent(mockData).subscribe((response: any) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/updateAssignedAgent');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockResponse);
  });

  it('should handle error when updating assigned agent', () => {
    const mockData = { id: 1, assigned_agent: 'Agent1' };
    const errorMessage = 'Internal Server Error';

    service.updateAssignedAgent(mockData).subscribe(
      () => {
        fail('Expected the request to fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:8080/updateAssignedAgent');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);
    req.error(new ErrorEvent('Internal Server Error'), {
      status: 500,
      statusText: errorMessage,
    });
  });

  it('should fetch agent details', () => {
    const agentName = 'Agent1';
    const mockDetails = { id: 1, name: 'Agent1' };

    service.viewAssignedAgentDetails(agentName).subscribe((details: any) => {
      expect(details).toEqual(mockDetails);
    });

    const req = httpMock.expectOne(`http://localhost:8080/agentDetails/${agentName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });

  it('should handle error when fetching agent details', () => {
    const agentName = 'Agent1';
    const errorMessage = 'Internal Server Error';

    service.viewAssignedAgentDetails(agentName).subscribe(
      () => {
        fail('Expected the request to fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`http://localhost:8080/agentDetails/${agentName}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'), {
      status: 500,
      statusText: errorMessage,
    });
  });

  it('should handle error when fetching surgeries with invalid URL', () => {
    const invalidUrl = 'http://localhost:8080/invalidUrl';
    const errorMessage = 'Not Found';

    service.fetchSurgeries().subscribe(
      () => {
        fail('Expected the request to fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(invalidUrl);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Not Found'), {
      status: 404,
      statusText: errorMessage,
    });
  });

  it('should handle error when updating assigned agent with invalid URL', () => {
    const mockData = { id: 1, assigned_agent: 'Agent1' };
    const invalidUrl = 'http://localhost:8080/invalidUrl';
    const errorMessage = 'Not Found';

    service.updateAssignedAgent(mockData).subscribe(
      () => {
        fail('Expected the request to fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(invalidUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockData);
    req.error(new ErrorEvent('Not Found'), {
      status: 404,
      statusText: errorMessage,
    });
  });

  it('should handle error when fetching agent details with invalid URL', () => {
    const agentName = 'Agent1';
    const invalidUrl = `http://localhost:8080/invalidUrl/${agentName}`;
    const errorMessage = 'Not Found';

    service.viewAssignedAgentDetails(agentName).subscribe(
      () => {
        fail('Expected the request to fail');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(invalidUrl);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Not Found'), {
      status: 404,
      statusText: errorMessage,
    });
  });
});