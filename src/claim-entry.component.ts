import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiagnosisPointersModalComponent } from './components/diagnosis-pointers-modal/diagnosis-pointers-modal.component';
import { ContactsBenefitsComponent } from './components/contacts-benefits/contacts-benefits.component';
import { ContactFitComponent } from './components/contact-fit/contact-fit.component';
import { EyeglassesTileComponent } from './components/eyeglasses-tile/eyeglasses-tile.component';
import { LensesTileComponent } from './components/lenses-tile/lenses-tile.component';
import { MedSurgTileComponent } from './components/med-surg-tile/med-surg-tile.component';

interface DiagnosisCode {
  code: string;
  description: string;
}

@Component({
  selector: 'app-claim-entry',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    ContactsBenefitsComponent,
    ContactFitComponent,
    EyeglassesTileComponent,
    LensesTileComponent,
    MedSurgTileComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="claim-entry-container">
      <mat-toolbar class="top-nav">
        <div class="left-section">
          <img src="assets/skygen-white.svg" alt="" class="logo">
          <div class="nav-links">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">Authorization</a>
            <a href="#" class="nav-link">Claims</a>
            <a href="#" class="nav-link">Entity Management</a>
            <a href="#" class="nav-link">Resource Center</a>
            <a href="#" class="nav-link">Contact Us</a>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="personal-info-button">Hello, Albert Gilbert</button>
          <mat-icon>notifications</mat-icon>
        </div>
      </mat-toolbar>

      <div class="content-wrapper">
        <button mat-button class="back-button" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back
        </button>
        <h1>Claim Entry</h1>
        <mat-card class="info-card">
          <mat-card-content>
            <div class="card-header">
              <h2>Selected Claim Information</h2>
              <button mat-button class="update-button">Update Selected Information</button>
            </div>

            <div class="info-grid">
              <div class="info-section">
                <mat-card class="sub-card">
                  <mat-card-content>
                    <h3>Patient: Tony Perez (DOB 05/22/1964)</h3>
                    <p>4002 Apple Street</p>
                    <p>Mequon, WI 53092</p>
                  </mat-card-content>
                </mat-card>

                <mat-card class="sub-card">
                  <mat-card-content>
                    <h3>Provider: Fuzzy Gizmo</h3>
                    <p>Fix'n Teeth Shop</p>
                    <p>4002 Apple Street</p>
                    <p>Mequon, WI 53092</p>
                  </mat-card-content>
                </mat-card>
              </div>

              <mat-card class="sub-card product-card">
                <mat-card-content>
                  <h3>Selected Product: Product A</h3>
                  <div class="product-grid">
                    <div class="product-item">
                      <span class="label">Eligible</span>
                      <span class="value">
                        <span class="status-badge">Yes</span>
                      </span>
                    </div>
                    <div class="product-item">
                      <span class="label">Client Product ID</span>
                      <span class="value">1043</span>
                    </div>
                    <div class="product-item">
                      <span class="label">Product Class/Group</span>
                      <span class="value">Commercial/SKYGEN</span>
                    </div>
                    <div class="product-item">
                      <span class="label">Effective Dates</span>
                      <span class="value">01/02/2025 - 12/20/2025</span>
                    </div>
                    <div class="product-item">
                      <span class="label">Date of Service</span>
                      <span class="value">02/20/2025</span>
                    </div>
                    <div class="product-item">
                      <span class="label">Other</span>
                      <span class="value">Other?</span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <div class="services-section">
              <h3>Selected Services</h3>
              <div class="services-grid">
                <div class="service-chip">
                  <span class="chip-label">Selected</span>
                  <span class="chip-text">Exam Benefit</span>
                </div>
                <div class="service-chip">
                  <span class="chip-label">Selected</span>
                  <span class="chip-text">Contact Fit</span>
                </div>
                <div class="service-chip">
                  <span class="chip-label">Selected</span>
                  <span class="chip-text">Contacts Benefits</span>
                </div>
                <div class="service-chip">
                  <span class="chip-label">Selected</span>
                  <span class="chip-text">Frame Benefit</span>
                </div>
                <div class="service-chip">
                  <span class="chip-label">Selected</span>
                  <span class="chip-text">Lenses Benefit</span>
                </div>
                <div class="service-chip">
                  <span class="chip-label">Selected</span>
                  <span class="chip-text">Med/Surg</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <app-contact-fit></app-contact-fit>
        <app-contacts-benefits></app-contacts-benefits>
        <app-eyeglasses-tile></app-eyeglasses-tile>
        <app-lenses-tile></app-lenses-tile>
        <app-med-surg-tile></app-med-surg-tile>
      </div>
    </div>
  `,
  styles: [`
    .claim-entry-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .top-nav {
      background-color: #002F81;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60px;
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 64px;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .logo {
      height: 40px;
      width: auto;
      object-fit: contain;
    }

    .nav-links {
      display: flex;
      gap: 24px;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 8px 0;
      position: relative;
      font-size: 14px;
    }

    .nav-link:hover::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .personal-info-button {
      background-color: #042462 !important;
      color: white;
      font-size: 14px !important;
      font-family: 'Inter', sans-serif !important;
      font-weight: var(--font-weight-medium) !important;
      border: none;
      cursor: pointer;
      padding: 8px 20px;
      border-radius: 100pt;
    }

    .content-wrapper {
      padding: 24px;
      max-width: 1800px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 500;
      color: #333;
      margin: 0 0 24px 0;
    }

    .back-button {
      color: #002F81;
      margin-bottom: 24px;
      padding: 0;
    }

    .back-button mat-icon {
      margin-right: 8px;
    }

    .info-card {
      background: white;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .card-header h2 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }

    .update-button {
      color: #1976d2;
    }

    .info-grid {
      display: grid;
      gap: 24px;
    }

    .info-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .sub-card {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .sub-card h3 {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 12px 0;
    }

    .sub-card p {
      margin: 0 0 8px 0;
      color: #666;
    }

    .product-card h3 {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 16px 0;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .product-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .label {
      color: #666;
      font-size: 14px;
    }

    .value {
      font-weight: 500;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      background-color: #4caf50;
      color: white;
      border-radius: 12px;
      font-size: 12px;
    }

    .services-section {
      margin-top: 24px;
    }

    .services-section h3 {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 16px 0;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .service-chip {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .chip-label {
      color: white;
      background: #4caf50;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      align-self: flex-start;
    }

    .chip-text {
      font-weight: 500;
    }

    @media (max-width: 1200px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 1024px) {
      .services-grid {
        grid-template-columns: 1fr;
      }

      .product-tiles {
        grid-template-columns: 1fr;
      }

      .info-tiles {
        grid-template-columns: 1fr;
      }

      .claim360-container {
        padding: 16px;
      }
    }

    @media (max-width: 768px) {
      .top-nav {
        padding: 0 20px;
      }

      .nav-links {
        display: none;
      }

      .details-grid {
        grid-template-columns: 1fr;
      }

      .radio-group {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .referral-code {
        margin-left: 0;
      }

      .procedure-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .question-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .diabetes-fields {
        grid-template-columns: 1fr;
      }

      .modifiers-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .product-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ClaimEntryComponent implements OnInit {
  diagnosisForm: FormGroup;
  private diagnosisCodesSubject = new BehaviorSubject<DiagnosisCode[]>([]);
  diagnosisCodes$ = this.diagnosisCodesSubject.asObservable();
  diagnosisPointers: string[] = new Array(8).fill('');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.diagnosisForm = this.fb.group({
      primaryDiagnosis: ['', Validators.required],
      diagnosisCode2: [''],
      diagnosisCode3: [''],
      diagnosisCode4: [''],
      hasDiabetes: ['no', Validators.required],
      isReferred: ['no', Validators.required],
      referralCode: ['']
    });
  }

  ngOnInit() {
    this.loadDiagnosisCodes();
    this.setupFormValidation();
  }

  private setupFormValidation() {
    this.diagnosisForm.get('isReferred')?.valueChanges.subscribe(value => {
      const referralCodeControl = this.diagnosisForm.get('referralCode');
      if (value === 'yes') {
        referralCodeControl?.setValidators([Validators.required]);
      } else {
        referralCodeControl?.clearValidators();
      }
      referralCodeControl?.updateValueAndValidity();
    });
  }

  private loadDiagnosisCodes() {
    try {
      const codes: DiagnosisCode[] = [
        { code: 'CODE1', description: 'Description 1' },
        { code: 'CODE2', description: 'Description 2' }
      ];
      this.diagnosisCodesSubject.next(codes);
    } catch (error) {
      console.error('Error loading diagnosis codes:', error);
    }
  }

  goBack() {
    this.router.navigate(['/claim360']);
  }

  onReferralChange(value: string) {
    if (value === 'no') {
      this.diagnosisForm.patchValue({ referralCode: '' });
    }
  }

  clearSection() {
    this.diagnosisForm.reset({
      hasDiabetes: 'no',
      isReferred: 'no'
    });
  }

  async submitForm() {
    if (this.diagnosisForm.valid) {
      try {
        const formData = this.diagnosisForm.value;
        // Handle form submission
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      this.markFormGroupTouched(this.diagnosisForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}