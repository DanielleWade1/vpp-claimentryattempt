import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncompleteDraftsComponent } from './incomplete-drafts.component';
import { EyeglassOrdersComponent } from './eyeglass-orders.component';
import { ContactLensOrdersComponent } from './contact-lens-orders.component';
import { QuickAccessComponent } from './quick-access.component';
import { SystemAlertComponent } from './system-alert.component';
import { PaymentTransaction, Member } from './types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTableModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    IncompleteDraftsComponent,
    EyeglassOrdersComponent,
    ContactLensOrdersComponent,
    QuickAccessComponent,
    SystemAlertComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  providerName = "Dr. Sarah's Vision Care";
  currentDate = new Date();
  newAlerts = 2;

  // Claims metrics
  claimsEntered = 3;
  claimsSubmitted = 0;
  claimsInProcess = 2;
  claimsProcessedLast30Days = 1;

  // Payments
  paymentHistoryView: 'recent' | 'historical' = 'recent';
  displayedColumns: string[] = ['transaction_date', 'amount', 'actions'];
  recentTransactions: PaymentTransaction[] = [
    { transaction_date: '04/24/2025', amount: 25.00 },
    { transaction_date: '04/23/2025', amount: 100.00 },
    { transaction_date: '04/22/2025', amount: 75.00 }
  ];
  historicalTransactions: PaymentTransaction[] = [];
  currentTransactions: PaymentTransaction[] = [];

  locations = ['Location A', 'Location B', 'Location C'];
  providers = ['Provider A', 'Provider B', 'Provider C'];

  searchForm: FormGroup;
  selectedSearchMethod = 'subscriberId';
  selectedMember: Member | null = null;
  showResults = false;
  noResults = false;

  searchResults: Member[] = [];
  displayedMemberColumns: string[] = ['name', 'dob', 'address', 'select'];

  searchMethods = [
    { value: 'subscriberId', label: 'Subscriber ID' },
    { value: 'subscriberIdDob', label: 'Subscriber ID & DOB' },
    { value: 'lastNameDob', label: 'Last Name & DOB' },
    { value: 'fullNameDob', label: 'Full Name & DOB' },
    { value: 'ssnDob', label: 'Last Four of SSN & DOB' },
    { value: 'allFields', label: 'All Fields' },
    { value: 'medicaidId', label: 'Medicaid ID' }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      provider: ['', Validators.required],
      serviceDate: [null, Validators.required],
      searchMethod: ['subscriberId'],
      subscriberId: [''],
      firstName: [''],
      lastName: [''],
      ssn: [''],
      dob: [null],
      medicaidId: ['']
    });

    this.searchForm.get('searchMethod')?.valueChanges.subscribe(method => {
      this.updateFormValidation(method);
      this.clearResults();
    });

    // Initialize payments view
    this.currentTransactions = this.recentTransactions.slice(0, 3);
  }

  navigateToAuthorizations() {
    this.router.navigate(['/authorizations']);
  }

  formatAmount(amount: number): string {
    return amount.toFixed(2);
  }

  search() {
    if (this.searchForm.valid) {
      this.searchResults = [{
        id: '123456789',
        name: 'Tony Perez',
        dob: '02/20/1995',
        address: '4002 Apple Street, Mequon, WI 53092',
        products: [
          {
            name: 'Vision Plus',
            isEligible: true,
            benefits: [
              {
                name: 'Exam Benefit',
                allowance: 150,
                isAvailable: true
              },
              {
                name: 'Contact Fit',
                allowance: 150,
                isAvailable: true
              },
              {
                name: 'Enhanced Exam',
                allowance: 200,
                isAvailable: true
              },
              {
                name: 'Premium Frames',
                allowance: 250,
                isAvailable: true
              }
            ]
          }
        ],
        familyMembers: ['Tiffany Perez', 'Jordan Perez']
      }];

      this.showResults = true;
      this.noResults = this.searchResults.length === 0;
    } else {
      this.searchForm.markAllAsTouched();
    }
  }

  clearResults() {
    this.searchResults = [];
    this.selectedMember = null;
    this.showResults = false;
    this.noResults = false;
  }

  reset() {
    this.searchForm.reset({
      searchMethod: 'subscriberId'
    });
    this.updateFormValidation('subscriberId');
    this.clearResults();
  }

  selectMember(event: Event, member: Member) {
    event.stopPropagation(); // Prevent panel expansion when clicking the button
    this.router.navigate(['/claim360'], {
      state: { member }
    });
  }

  updateFormValidation(method: string) {
    const fields = ['subscriberId', 'firstName', 'lastName', 'ssn', 'dob', 'medicaidId'];
    fields.forEach(field => {
      this.searchForm.get(field)?.clearValidators();
      this.searchForm.get(field)?.updateValueAndValidity();
    });

    switch (method) {
      case 'subscriberId':
        this.searchForm.get('subscriberId')?.setValidators([Validators.required]);
        break;
      case 'subscriberIdDob':
        this.searchForm.get('subscriberId')?.setValidators([Validators.required]);
        this.searchForm.get('dob')?.setValidators([Validators.required]);
        break;
      case 'lastNameDob':
        this.searchForm.get('lastName')?.setValidators([Validators.required]);
        this.searchForm.get('dob')?.setValidators([Validators.required]);
        break;
      case 'fullNameDob':
        this.searchForm.get('firstName')?.setValidators([Validators.required]);
        this.searchForm.get('lastName')?.setValidators([Validators.required]);
        this.searchForm.get('dob')?.setValidators([Validators.required]);
        break;
      case 'ssnDob':
        this.searchForm.get('ssn')?.setValidators([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*$')
        ]);
        this.searchForm.get('dob')?.setValidators([Validators.required]);
        break;
      case 'allFields':
        fields.forEach(field => {
          if (field === 'ssn') {
            this.searchForm.get(field)?.setValidators([
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(4),
              Validators.pattern('^[0-9]*$')
            ]);
          } else if (field !== 'medicaidId') {
            this.searchForm.get(field)?.setValidators([Validators.required]);
          }
        });
        break;
      case 'medicaidId':
        this.searchForm.get('medicaidId')?.setValidators([Validators.required]);
        break;
    }

    fields.forEach(field => {
      this.searchForm.get(field)?.updateValueAndValidity();
    });
  }

  shouldShowField(fieldName: string): boolean {
    const method = this.searchForm.get('searchMethod')?.value;
    switch (fieldName) {
      case 'subscriberId':
        return method === 'subscriberId' ||
               method === 'subscriberIdDob' ||
               method === 'allFields';
      case 'firstName':
        return method === 'fullNameDob' ||
               method === 'allFields';
      case 'lastName':
        return method === 'lastNameDob' ||
               method === 'fullNameDob' ||
               method === 'allFields';
      case 'ssn':
        return method === 'ssnDob' ||
               method === 'allFields';
      case 'dob':
        return method === 'subscriberIdDob' ||
               method === 'lastNameDob' ||
               method === 'fullNameDob' ||
               method === 'ssnDob' ||
               method === 'allFields';
      case 'medicaidId':
        return method === 'medicaidId';
      default:
        return false;
    }
  }

  togglePaymentHistoryView(event: any) {
    this.paymentHistoryView = event.checked ? 'historical' : 'recent';
    this.fetchTransactionData();
  }

  fetchTransactionData() {
    if (this.paymentHistoryView === 'recent') {
      this.currentTransactions = this.recentTransactions.slice(0, 3);
    } else {
      this.historicalTransactions = [
        { transaction_date: '03/24/2025', amount: 25.00 },
        { transaction_date: '03/23/2025', amount: 100.00 },
        { transaction_date: '03/22/2025', amount: 75.00 }
      ];
      this.currentTransactions = this.historicalTransactions.slice(0, 3);
    }
  }

  viewPayment(date: string) {
    this.router.navigate(['/payments', date]);
  }
}