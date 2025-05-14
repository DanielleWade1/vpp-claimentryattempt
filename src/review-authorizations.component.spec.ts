import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewAuthorizationsComponent } from './review-authorizations.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

describe('ReviewAuthorizationsComponent', () => {
  let component: ReviewAuthorizationsComponent;
  let fixture: ComponentFixture<ReviewAuthorizationsComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        ReviewAuthorizationsComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAuthorizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with mock authorization data', () => {
    expect(component.auth).toBeDefined();
    expect(component.auth?.authNumber).toBe('A022052400001');
    expect(component.auth?.patientName).toBe('Tony Perez');
    expect(component.currentDate).toBeDefined();
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate back when close is called', () => {
    component.close();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should have provider details initialized', () => {
    expect(component.auth?.providerDetails).toBeDefined();
    expect(component.auth?.providerDetails?.name).toBe('Tony Glasses');
    expect(component.auth?.providerDetails?.practice).toBe('Glasses Plus');
  });

  it('should have patient details initialized', () => {
    expect(component.auth?.patientDetails).toBeDefined();
    expect(component.auth?.patientDetails?.address).toBe('4002 Apple Street');
    expect(component.auth?.patientDetails?.city).toBe('Mequon');
  });

  it('should have diagnosis codes initialized', () => {
    expect(component.auth?.diagnosisCodes).toBeDefined();
    expect(component.auth?.diagnosisCodes?.length).toBe(2);
  });

  it('should have services initialized', () => {
    expect(component.auth?.services).toBeDefined();
    expect(component.auth?.services?.length).toBe(1);
    expect(component.auth?.services?.[0].code).toBe('V251');
  });
});