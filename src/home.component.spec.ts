import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        FormsModule,
        HomeComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.displayedColumns.length).toBe(9);
    expect(component.searchCriteria).toBeDefined();
    expect(component.searchCriteria.status).toBe('');
    expect(component.searchCriteria.authNumber).toBe('');
    expect(component.searchCriteria.anticipatedServiceDateFrom).toBeNull();
    expect(component.searchCriteria.anticipatedServiceDateTo).toBeNull();
    expect(component.itemsPerPage).toBe(10);
  });

  it('should clear filters', () => {
    // Set some filter values
    component.searchCriteria = {
      status: 'pending',
      authNumber: '123',
      anticipatedServiceDateFrom: new Date(),
      anticipatedServiceDateTo: new Date()
    };
    component.filteredData = [];

    // Clear filters
    component.clearFilters();

    // Check if filters are cleared
    expect(component.searchCriteria.status).toBe('');
    expect(component.searchCriteria.authNumber).toBe('');
    expect(component.searchCriteria.anticipatedServiceDateFrom).toBeNull();
    expect(component.searchCriteria.anticipatedServiceDateTo).toBeNull();
    expect(component.filteredData).toEqual(component.allData);
  });

  it('should filter data based on status', () => {
    component.searchCriteria.status = 'Determined';
    component.search();
    expect(component.filteredData.every(item => 
      item.status.toLowerCase() === 'determined'
    )).toBeTrue();
  });

  it('should filter data based on auth number', () => {
    component.searchCriteria.authNumber = 'A024';
    component.search();
    expect(component.filteredData.every(item => 
      item.authNumber.toLowerCase().includes('a024')
    )).toBeTrue();
  });

  it('should navigate to review page when viewing details', () => {
    const authNumber = 'A024022800001';
    component.viewDetails(authNumber);
    expect(router.navigate).toHaveBeenCalledWith(['/review', authNumber]);
  });
});