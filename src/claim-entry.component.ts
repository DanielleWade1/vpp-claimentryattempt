import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiagnosisPointersModalComponent } from './components/diagnosis-pointers-modal/diagnosis-pointers-modal.component';

@Component({
  selector: 'app-claim-entry',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  template: `
    <mat-card class="claim-entry-card">
      <mat-card-header>
        <mat-card-title>Claim Entry</mat-card-title>
        <div class="header-actions">
          <button mat-button color="primary" (click)="addDiagnosisCodes()">
            Add Diagnosis Codes
          </button>
        </div>
      </mat-card-header>

      <mat-card-content>
        <div class="code-type">
          <span class="label">Code Type</span>
          <span class="value">ICD - 10</span>
        </div>

        <div class="procedures-section">
          <div class="procedure-row">
            <div class="procedure-code">
              <label>Procedure Code 1 <span class="required">Required</span></label>
              <mat-form-field appearance="outline">
                <mat-select formControlName="procedureCode1">
                  <mat-option value="code1">Code 1</mat-option>
                  <mat-option value="code2">Code 2</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="procedure-amount">
              <label>Procedure Code Amount <span class="required">Required</span></label>
              <mat-form-field appearance="outline">
                <span matPrefix>$&nbsp;</span>
                <input matInput type="number" formControlName="procedureAmount1">
              </mat-form-field>
            </div>
          </div>

          <div class="procedure-row">
            <div class="procedure-code">
              <label>Procedure Code 2</label>
              <mat-form-field appearance="outline">
                <mat-select formControlName="procedureCode2" [disabled]="!contactFitForm.get('procedureCode1')?.value">
                  <mat-option value="code1">Code 1</mat-option>
                  <mat-option value="code2">Code 2</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            <div class="procedure-amount">
              <label>Procedure Code Amount</label>
              <mat-form-field appearance="outline">
                <span matPrefix>$&nbsp;</span>
                <input matInput type="number" formControlName="procedureAmount2" [disabled]="!contactFitForm.get('procedureCode1')?.value">
              </mat-form-field>
            </div>
          </div>

          <div class="medically-necessary-section">
            <mat-checkbox formControlName="medicallyNecessary">Medically necessary</mat-checkbox>
          </div>

          <div class="modifiers-section" *ngIf="contactFitForm.get('medicallyNecessary')?.value">
            <div class="modifiers-grid">
              <div class="modifier-field">
                <label>Modifier 1</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="modifier1">
                    <mat-option value="mod1">Modifier 1</mat-option>
                    <mat-option value="mod2">Modifier 2</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <div class="modifier-field">
                <label>Modifier 2</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="modifier2">
                    <mat-option value="mod1">Modifier 1</mat-option>
                    <mat-option value="mod2">Modifier 2</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <div class="modifier-field">
                <label>Modifier 3</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="modifier3">
                    <mat-option value="mod1">Modifier 1</mat-option>
                    <mat-option value="mod2">Modifier 2</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <div class="modifier-field">
                <label>Modifier 4</label>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="modifier4">
                    <mat-option value="mod1">Modifier 1</mat-option>
                    <mat-option value="mod2">Modifier 2</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
            </div>
          </div>
        </div>

        <mat-card-actions>
          <div class="actions-container">
            <button mat-button color="primary" (click)="clearSection()">Clear Section</button>
            <div class="total-cost">
              <span>Total Contact Fit Cost</span>
              <span class="amount">{{calculateTotalCost() | number:'1.2-2'}}</span>
            </div>
          </div>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .claim-entry-card {
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

    .info-section {
      margin-bottom: 20px;
    }

    .procedures-section {
      margin-bottom: 32px;
    }

    .procedure-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 16px;
    }

    .procedure-code, .procedure-amount {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }

    .required {
      color: #f44336;
      margin-left: 4px;
    }

    mat-form-field {
      width: 100%;
    }

    .medically-necessary-section {
      margin: 16px 0;
    }

    .modifiers-section {
      margin: 16px 0;
    }

    .modifiers-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .modifier-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .modifier-field label {
      color: #666;
      font-size: 14px;
    }

    mat-card-actions {
      padding: 16px;
      border-top: 1px solid #eee;
    }

    .actions-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .total-cost {
      display: flex;
      align-items: center;
      gap: 16px;
      font-weight: 500;
    }

    .amount {
      font-size: 20px;
      color: #002F81;
    }

    @media (max-width: 768px) {
      .procedure-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .modifiers-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .modifiers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ClaimEntryComponent {
  contactFitForm: FormGroup;
  diagnosisPointers: string[] = new Array(8).fill('');

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.contactFitForm = this.fb.group({
      procedureCode1: [''],
      procedureAmount1: [null],
      procedureCode2: [''],
      procedureAmount2: [null],
      medicallyNecessary: [false],
      modifier1: [''],
      modifier2: [''],
      modifier3: [''],
      modifier4: ['']
    });
  }

  addDiagnosisCodes() {
    const dialogRef = this.dialog.open(DiagnosisPointersModalComponent, {
      data: { pointers: this.diagnosisPointers },
      width: '600px',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diagnosisPointers = result;
      }
    });
  }

  calculateTotalCost(): number {
    const amount1 = this.contactFitForm.get('procedureAmount1')?.value || 0;
    const amount2 = this.contactFitForm.get('procedureAmount2')?.value || 0;
    return amount1 + amount2;
  }

  clearSection() {
    this.contactFitForm.reset({
      medicallyNecessary: false
    });
  }
}