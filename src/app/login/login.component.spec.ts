import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListSugeriesComponent } from '../list-sugeries/list-sugeries.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of,throwError} from 'rxjs';

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

class MockApiService {
  login(email: string, password: string) {
    if (email === 'dealer@gmail.com' && password === '12345') {
      return of({ success: true });
    } else {
      return throwError('Invalid credentials');
    }
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ApiService, useClass: MockApiService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.callThrough(); // Spy on router.navigateByUrl() method
    spyOn(window, 'alert'); // Spy on window.alert() method
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('Positive scenarios', () => {
    it('should navigate to "/dealerportal" on valid login credentials', () => {
      component.email = 'dealer@gmail.com';
      component.password = '12345';

      component.readValues();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/dealerportal');
    });

    it('should not navigate to "/dealerportal" on invalid login credentials', () => {
      component.email = 'invalid@gmail.com';
      component.password = '54321';

      component.readValues();

      expect(router.navigateByUrl).not.toHaveBeenCalledWith('/dealerportal');
    });
  });

  describe('Negative scenarios', () => {
    it('should display an alert and clear fields on invalid login credentials', () => {
      component.email = 'invalid@gmail.com';
      component.password = '54321';

      component.readValues();

      expect(window.alert).toHaveBeenCalledWith('Invalid Login Credentials');
      expect(component.email).toEqual('');
      expect(component.password).toEqual('');
    });

    it('should display an alert and clear fields on empty email and password fields', () => {
      component.email = '';
      component.password = '';

      component.readValues();

      expect(window.alert).toHaveBeenCalledWith('Invalid Login Credentials');
      expect(component.email).toEqual('');
      expect(component.password).toEqual('');
    });

    it('should display an alert and clear fields on login API error', () => {
      

      component.email = 'dealer@gmail.com';
      component.password = '12345';

      component.readValues();

      expect(window.alert).toHaveBeenCalledWith('An error occurred. Please try again later.');
      expect(component.email).toEqual('');
      expect(component.password).toEqual('');
    });
  });
});