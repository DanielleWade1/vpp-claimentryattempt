import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ClaimEntryService } from '../../services/claim-entry.service';

interface DiagnosisCode {
  code: string;
  description: string;
}

@Component({
  selector: 'app-diagnosis-section',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card class="diagnosis-card">
      <mat-card-content>
        <h2>Diagnosis Codes as Indicated <span class="subtitle">(Include all applicable diagnosis codes)</span></h2>
        
        <div class="code-type">
          <span class="label">Code Type</span>
          <span class="value">ICD - 10</span>
        </div>

        <form [formGroup]="diagnosisForm">
          <div class="diagnosis-grid">
            <div class="diagnosis-item">
              <label>Primary Diagnosis</label>
              <mat-select formControlName="primaryDiagnosis" placeholder="Select code">
                <mat-option *ngFor="let code of diagnosisCodes$ | async" [value]="code.code">
                  {{code.code}} - {{code.description}}
                </mat-option>
              </mat-select>
            </div>
            <div class="diagnosis-item">
              <label>Diagnosis Code 2</label>
              <mat-select formControlName="diagnosisCode2" placeholder="Select code">
                <mat-option *ngFor="let code of diagnosisCodes$ | async" [value]="code.code">
                  {{code.code}} - {{code.description}}
                </mat-option>
              </mat-select>
            </div>
            <div class="diagnosis-item">
              <label>Diagnosis Code 3</label>
              <mat-select formControlName="diagnosisCode3" placeholder="Select code">
                <mat-option *ngFor="let code of diagnosisCodes$ | async" [value]="code.code">
                  {{code.code}} - {{code.description}}
                </mat-option>
              </mat-select>
            </div>
            <div class="diagnosis-item">
              <label>Diagnosis Code 4</label>
              <mat-select formControlName="diagnosisCode4" placeholder="Select code">
                <mat-option *ngFor="let code of diagnosisCodes$ | async" [value]="code.code">
                  {{code.code}} - {{code.description}}
                </mat-option>
              </mat-select>
            </div>
          </div>

          <div class="patient-info">
            <div class="radio-group">
              <label class="radio-label">Is this patient known to have diabetes:</label>
              <mat-radio-group formControlName="hasDiabetes">
                <mat-radio-button value="yes">Yes</mat-radio-button>
                <mat-radio-button value="no">No</mat-radio-button>
              </mat-radio-group>
            </div>

            <div class="radio-group">
              <label class="radio-label">Patient referred to their primary care provider:</label>
              <mat-radio-group formControlName="isReferred" (ngModelChange)="onReferralChange($event)">
                <mat-radio-button value="yes">Yes</mat-radio-button>
                <mat-radio-button value="no">No</mat-radio-button>
              </mat-radio-group>
            </div>

            <div *ngIf="diagnosisForm.get('isReferred')?.value === 'yes'" class="referral-code">
              <label>Referral Diagnosis Code:</label>
              <mat-select formControlName="referralCode" placeholder="Select referral code">
                <mat-option *ngFor="let code of diagnosisCodes$ | async" [value]="code.code">
                  {{code.code}} - {{code.description}}
                </mat-option>
              </mat-select>
            </div>
          </div>

          <div class="actions">
            <button mat-button color="primary" (click)="clearSection()">Clear Section</button>
            <button mat-button color="primary" (click)="submitForm()">Submit</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .diagnosis-card {
      background: white;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .diagnosis-card h2 {
      font-size: 20px;
      font-weight: 500;
      margin: 0 0 24px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .subtitle {
      font-size: 14px;
      color: #666;
      font-weight: normal;
    }

    .code-type {
      margin-bottom: 24px;
    }

    .code-type .label {
      color: #666;
      margin-right: 8px;
    }

    .code-type .value {
      font-weight: 500;
    }

    .diagnosis-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .diagnosis-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .diagnosis-item label {
      color: #666;
      font-size: 14px;
    }

    ::ng-deep .diagnosis-item .mat-mdc-select {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      height: 56px;
    }

    ::ng-deep .diagnosis-item .mat-mdc-select-trigger {
      padding: 16px;
    }

    ::ng-deep .diagnosis-item .mat-mdc-select-arrow {
      margin-right: 16px;
    }

    .patient-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin: 32px 0;
    }

    .radio-group {
      display: grid;
      grid-template-columns: 300px 1fr;
      align-items: center;
    }

    .radio-label {
      color: #333;
      font-size: 14px;
    }

    .mat-radio-group {
      display: flex;
      gap: 32px;
    }

    ::ng-deep .mat-radio-button .mat-radio-label {
      align-items: center;
    }

    .referral-code {
      margin-left: 300px;
      margin-top: 16px;
    }

    .referral-code label {
      display: block;
      color: #666;
      font-size: 14px;
      margin-bottom: 8px;
    }

    ::ng-deep .referral-code .mat-mdc-select {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      height: 56px;
      width: 100%;
    }

    ::ng-deep .referral-code .mat-mdc-select-trigger {
      padding: 16px;
    }

    ::ng-deep .referral-code .mat-mdc-select-arrow {
      margin-right: 16px;
    }

    .actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    @media (max-width: 1200px) {
      .diagnosis-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .diagnosis-grid {
        grid-template-columns: 1fr;
      }

      .radio-group {
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .referral-code {
        margin-left: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagnosisSectionComponent implements OnInit {
  diagnosisForm = this.claimEntryService.getDiagnosisForm();
  private diagnosisCodesSubject = new BehaviorSubject<DiagnosisCode[]>([]);
  diagnosisCodes$ = this.diagnosisCodesSubject.asObservable();

  constructor(private claimEntryService: ClaimEntryService) {}

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

  onReferralChange(value: string) {
    if (value === 'no') {
      this.diagnosisForm.patchValue({ referralCode: '' });
    }
  }

  clearSection() {
    this.claimEntryService.resetDiagnosisForm();
  }

  submitForm() {
    if (this.diagnosisForm.valid) {
      try {
        const formData = this.diagnosisForm.value;
        // Handle form submission
        console.log('Form submitted:', formData);
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