import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-other-coverage',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card class="other-coverage-card">
      <mat-card-header>
        <mat-card-title>Other Coverage</mat-card-title>
      </mat-card-header>

      <mat-card-content [formGroup]="otherCoverageForm">
        <div class="main-toggle">
          <mat-radio-group formControlName="hasOtherCoverage">
            <mat-radio-button [value]="true">This patient has other coverage</mat-radio-button>
            <mat-radio-button [value]="false">No other coverage</mat-radio-button>
          </mat-radio-group>
        </div>

        <ng-container *ngIf="otherCoverageForm.get('hasOtherCoverage')?.value">
          <!-- Insured Information -->
          <mat-card class="sub-card">
            <mat-card-header>
              <mat-card-title>Insured Information</mat-card-title>
            </mat-card-header>
            <mat-card-content formGroupName="insuredInfo">
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Policy Group or FECA Number</mat-label>
                  <mat-select formControlName="policyGroup">
                    <mat-option value="group1">Group 1</mat-option>
                    <mat-option value="group2">Group 2</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Gender</mat-label>
                  <mat-select formControlName="gender">
                    <mat-option value="male">Male</mat-option>
                    <mat-option value="female">Female</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Date of Birth</mat-label>
                  <input matInput type="date" formControlName="dob">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Other Claim ID</mat-label>
                  <mat-select formControlName="otherClaimIdType">
                    <mat-option value="1">1</mat-option>
                    <mat-option value="2">2</mat-option>
                    <mat-option value="3">3</mat-option>
                    <mat-option value="4">4</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Other Claim ID</mat-label>
                  <input matInput formControlName="otherClaimId">
                </mat-form-field>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Other Insured Information -->
          <mat-card class="sub-card">
            <mat-card-header>
              <mat-card-title>Other Insured Information</mat-card-title>
            </mat-card-header>
            <mat-card-content formGroupName="otherInsuredInfo">
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput formControlName="firstName">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput formControlName="lastName">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Policy or Group Number</mat-label>
                  <input matInput formControlName="policyNumber">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Insurance Plan Name or Program Name</mat-label>
                  <input matInput formControlName="insurancePlanName">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Claim Filing Indicator</mat-label>
                  <input matInput formControlName="claimFilingIndicator">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Date Paid</mat-label>
                  <input matInput type="date" formControlName="datePaid">
                </mat-form-field>
              </div>

              <div class="divider"></div>

              <div class="radio-section">
                <label class="radio-label">Patient's Relationship to the insured:</label>
                <mat-radio-group formControlName="relationship">
                  <mat-radio-button value="self">Self</mat-radio-button>
                  <mat-radio-button value="spouse">Spouse</mat-radio-button>
                  <mat-radio-button value="dependent">Dependent</mat-radio-button>
                  <mat-radio-button value="other">Other</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="radio-section">
                <label class="radio-label">EOB Present?</label>
                <mat-radio-group formControlName="eobPresent">
                  <mat-radio-button value="yes">Yes</mat-radio-button>
                  <mat-radio-button value="no">No</mat-radio-button>
                </mat-radio-group>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Other Insured Information 2 -->
          <mat-card class="sub-card">
            <mat-card-header>
              <mat-card-title>Other Insured Information 2</mat-card-title>
            </mat-card-header>
            <mat-card-content formGroupName="otherInsuredInfo2">
              <div class="radio-section">
                <label class="radio-label">EOB Present?</label>
                <mat-radio-group formControlName="eobPresent">
                  <mat-radio-button value="yes">Yes</mat-radio-button>
                  <mat-radio-button value="no">No</mat-radio-button>
                </mat-radio-group>
              </div>
            </mat-card-content>
          </mat-card>
        </ng-container>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .other-coverage-card {
      margin: 24px 0;
    }

    mat-card-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
    }

    mat-card-title {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }

    mat-card-content {
      padding: 24px;
    }

    .main-toggle {
      margin-bottom: 24px;
    }

    .sub-card {
      margin-bottom: 24px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
    }

    .sub-card:last-child {
      margin-bottom: 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 24px 0;
    }

    .radio-section {
      margin-bottom: 16px;
    }

    .radio-section:last-child {
      margin-bottom: 0;
    }

    .radio-label {
      display: block;
      margin-bottom: 8px;
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
    }

    mat-radio-group {
      display: flex;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      mat-radio-group {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class OtherCoverageComponent {
  otherCoverageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.otherCoverageForm = this.fb.group({
      hasOtherCoverage: [false],
      insuredInfo: this.fb.group({
        policyGroup: [''],
        gender: [''],
        dob: [''],
        otherClaimIdType: [''],
        otherClaimId: ['']
      }),
      otherInsuredInfo: this.fb.group({
        firstName: [''],
        lastName: [''],
        policyNumber: [''],
        insurancePlanName: [''],
        claimFilingIndicator: [''],
        datePaid: [''],
        relationship: ['self'],
        eobPresent: ['no']
      }),
      otherInsuredInfo2: this.fb.group({
        eobPresent: ['no']
      })
    });

    // Add/remove validators based on hasOtherCoverage value
    this.otherCoverageForm.get('hasOtherCoverage')?.valueChanges.subscribe(hasOtherCoverage => {
      const controls = [
        ...Object.keys(this.otherCoverageForm.get('insuredInfo')?.controls || {}),
        ...Object.keys(this.otherCoverageForm.get('otherInsuredInfo')?.controls || {}),
        ...Object.keys(this.otherCoverageForm.get('otherInsuredInfo2')?.controls || {})
      ];

      controls.forEach(controlName => {
        const control = this.otherCoverageForm.get(`insuredInfo.${controlName}`) ||
                       this.otherCoverageForm.get(`otherInsuredInfo.${controlName}`) ||
                       this.otherCoverageForm.get(`otherInsuredInfo2.${controlName}`);
        
        if (control) {
          if (hasOtherCoverage) {
            control.enable();
          } else {
            control.disable();
            control.setValue('');
          }
        }
      });
    });
  }
}