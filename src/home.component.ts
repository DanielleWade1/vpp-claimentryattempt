import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthorizationData, SearchCriteria } from './types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
    ReactiveFormsModule,
    RouterModule,
    A11yModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = [
    'authNumber',
    'patientName',
    'dob',
    'providerName',
    'anticipatedDOS',
    'enteredDate',
    'determinationDate',
    'status',
    'actions'
  ];

  currentDisplayedColumns: string[] = [...this.displayedColumns];

  anticipatedServiceDateRange: FormGroup;
  enteredDateRange: FormGroup;
  determinationDateRange: FormGroup;

  searchCriteria: SearchCriteria = {
    status: '',
    authNumber: '',
    anticipatedServiceDateRange: {
      start: null,
      end: null
    },
    enteredDateRange: {
      start: null,
      end: null
    },
    determinationDateRange: {
      start: null,
      end: null
    },
    firstName: '',
    lastName: '',
    subscriberId: '',
    insurer: ''
  };

  allData: AuthorizationData[] = [
    {
      authNumber: 'A024022800001',
      patientName: 'Janet Bench',
      dob: '03/01/1950',
      providerName: 'Dr. Susie Glass',
      anticipatedDOS: '06/12/2024',
      enteredDate: '06/12/2024',
      determinationDate: '06/12/2024-06/13/2024',
      status: 'Determined'
    }
  ];

  filteredData: AuthorizationData[] = [...this.allData];
  itemsPerPage = 10;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.anticipatedServiceDateRange = this.fb.group({
      start: [null],
      end: [null]
    });

    this.enteredDateRange = this.fb.group({
      start: [null],
      end: [null]
    });

    this.determinationDateRange = this.fb.group({
      start: [null],
      end: [null]
    });

    // Subscribe to form changes
    this.anticipatedServiceDateRange.valueChanges.subscribe(range => {
      this.searchCriteria.anticipatedServiceDateRange = range;
    });

    this.enteredDateRange.valueChanges.subscribe(range => {
      this.searchCriteria.enteredDateRange = range;
    });

    this.determinationDateRange.valueChanges.subscribe(range => {
      this.searchCriteria.determinationDateRange = range;
    });

    // Subscribe to breakpoint changes
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
        // Mobile view
        this.currentDisplayedColumns = ['authNumber', 'patientName', 'actions'];
      } else if (result.breakpoints[Breakpoints.Medium]) {
        // Tablet view
        this.currentDisplayedColumns = ['authNumber', 'patientName', 'status', 'actions'];
      } else {
        // Desktop view
        this.currentDisplayedColumns = this.displayedColumns;
      }
    });
  }

  search() {
    this.filteredData = this.allData.filter(auth => {
      const matchStatus = !this.searchCriteria.status || 
        auth.status.toLowerCase() === this.searchCriteria.status.toLowerCase();
      
      const matchAuthNumber = !this.searchCriteria.authNumber || 
        auth.authNumber.toLowerCase().includes(this.searchCriteria.authNumber.toLowerCase());
      
      // Date range matching
      let matchDates = true;
      
      // Anticipated Service Date Range
      if (this.searchCriteria.anticipatedServiceDateRange.start || this.searchCriteria.anticipatedServiceDateRange.end) {
        const authDate = new Date(auth.anticipatedDOS);
        if (this.searchCriteria.anticipatedServiceDateRange.start) {
          matchDates = matchDates && authDate >= this.searchCriteria.anticipatedServiceDateRange.start;
        }
        if (this.searchCriteria.anticipatedServiceDateRange.end) {
          matchDates = matchDates && authDate <= this.searchCriteria.anticipatedServiceDateRange.end;
        }
      }

      // Entered Date Range
      if (this.searchCriteria.enteredDateRange.start || this.searchCriteria.enteredDateRange.end) {
        const enteredDate = new Date(auth.enteredDate);
        if (this.searchCriteria.enteredDateRange.start) {
          matchDates = matchDates && enteredDate >= this.searchCriteria.enteredDateRange.start;
        }
        if (this.searchCriteria.enteredDateRange.end) {
          matchDates = matchDates && enteredDate <= this.searchCriteria.enteredDateRange.end;
        }
      }

      // Determination Date Range
      if (this.searchCriteria.determinationDateRange.start || this.searchCriteria.determinationDateRange.end) {
        const determDate = new Date(auth.determinationDate.split('-')[0]);
        if (this.searchCriteria.determinationDateRange.start) {
          matchDates = matchDates && determDate >= this.searchCriteria.determinationDateRange.start;
        }
        if (this.searchCriteria.determinationDateRange.end) {
          matchDates = matchDates && determDate <= this.searchCriteria.determinationDateRange.end;
        }
      }

      // Member Information filtering
      const matchFirstName = !this.searchCriteria.firstName || 
        auth.patientName.toLowerCase().includes(this.searchCriteria.firstName.toLowerCase());
      const matchLastName = !this.searchCriteria.lastName || 
        auth.patientName.toLowerCase().includes(this.searchCriteria.lastName.toLowerCase());
      const matchSubscriberId = !this.searchCriteria.subscriberId || 
        auth.authNumber.toLowerCase().includes(this.searchCriteria.subscriberId.toLowerCase());
      const matchInsurer = !this.searchCriteria.insurer || 
        auth.providerName.toLowerCase().includes(this.searchCriteria.insurer.toLowerCase());

      return matchStatus && matchAuthNumber && matchDates && 
             matchFirstName && matchLastName && matchSubscriberId && matchInsurer;
    });
  }

  clearFilters() {
    this.searchCriteria = {
      status: '',
      authNumber: '',
      anticipatedServiceDateRange: {
        start: null,
        end: null
      },
      enteredDateRange: {
        start: null,
        end: null
      },
      determinationDateRange: {
        start: null,
        end: null
      },
      firstName: '',
      lastName: '',
      subscriberId: '',
      insurer: ''
    };

    this.anticipatedServiceDateRange.reset();
    this.enteredDateRange.reset();
    this.determinationDateRange.reset();
    
    this.filteredData = [...this.allData];
  }

  viewDetails(authNumber: string) {
    this.router.navigate(['/review', authNumber]);
  }
}