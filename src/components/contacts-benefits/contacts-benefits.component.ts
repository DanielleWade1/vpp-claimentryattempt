import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DiagnosisPointersModalComponent } from '../diagnosis-pointers-modal/diagnosis-pointers-modal.component';

@Component({
  selector: 'app-contacts-benefits',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  template: `
    <mat-card class="contacts-benefits-card">
      <mat-card-header>
        <mat-card-title>Contacts Benefits</mat-card-title>
        <div class="header-actions">
          <button mat-button color="primary" (click)="addDiagnosisCodes()">
            Add Diagnosis Codes
          </button>
        </div>
      </mat-card-header>

      <mat-card-content [formGroup]="contactsForm">
        <!-- Right Eye Section -->
        <div class="eye-section">
          <h3>Right Eye</h3>
          <div class="checkbox-row">
            <mat-checkbox formControlName="rightSearchFormulary">
              Search Formulary Lenses Only
            </mat-checkbox>
            <mat-checkbox formControlName="rightSearchToric">
              Search Toric Lenses Only
            </mat-checkbox>
          </div>

          <div class="contacts-grid">
            <div class="field-container">
              <mat-form-field appearance="outline">
                <mat-label>Style</mat-label>
                <mat-select formControlName="rightStyle">
                  <mat-option value="style1">Style 1</mat-option>
                  <mat-option value="style2">Style 2</mat-option>
                </mat-select>
              </mat-form-field>
              <button mat-stroked-button 
                      class="ou-button" 
                      [class.selected]="styleOU"
                      (click)="toggleOU('style')">
                OU
              </button>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Color</mat-label>
              <mat-select formControlName="rightColor">
                <mat-option value="color1">Color 1</mat-option>
                <mat-option value="color2">Color 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Base Curve</mat-label>
              <mat-select formControlName="rightBaseCurve">
                <mat-option value="curve1">Curve 1</mat-option>
                <mat-option value="curve2">Curve 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Diameter</mat-label>
              <mat-select formControlName="rightDiameter">
                <mat-option value="diameter1">Diameter 1</mat-option>
                <mat-option value="diameter2">Diameter 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Sphere</mat-label>
              <mat-select formControlName="rightSphere">
                <mat-option value="sphere1">Sphere 1</mat-option>
                <mat-option value="sphere2">Sphere 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Qty/Boxes</mat-label>
              <input matInput type="number" formControlName="rightQty">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Billed Charges</mat-label>
              <input matInput type="number" formControlName="rightBilledCharges">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>
          </div>

          <div class="total-row">
            <mat-form-field appearance="outline">
              <mat-label>Total Billed</mat-label>
              <input matInput type="number" formControlName="rightTotalBilled">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>

            <button mat-stroked-button color="primary" class="ou-button">
              OU
            </button>
          </div>
        </div>

        <!-- Left Eye Section -->
        <div class="eye-section">
          <h3>Left Eye</h3>
          <div class="checkbox-row">
            <mat-checkbox formControlName="leftSearchFormulary">
              Search Formulary Lenses Only
            </mat-checkbox>
            <mat-checkbox formControlName="leftSearchToric">
              Search Toric Lenses Only
            </mat-checkbox>
          </div>

          <div class="contacts-grid">
            <div class="field-container">
              <mat-form-field appearance="outline">
                <mat-label>Style</mat-label>
                <mat-select formControlName="leftStyle">
                  <mat-option value="style1">Style 1</mat-option>
                  <mat-option value="style2">Style 2</mat-option>
                </mat-select>
              </mat-form-field>
              <button mat-stroked-button 
                      class="ou-button" 
                      [class.selected]="styleOU"
                      (click)="toggleOU('style')">
                OU
              </button>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Color</mat-label>
              <mat-select formControlName="leftColor">
                <mat-option value="color1">Color 1</mat-option>
                <mat-option value="color2">Color 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Base Curve</mat-label>
              <mat-select formControlName="leftBaseCurve">
                <mat-option value="curve1">Curve 1</mat-option>
                <mat-option value="curve2">Curve 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Diameter</mat-label>
              <mat-select formControlName="leftDiameter">
                <mat-option value="diameter1">Diameter 1</mat-option>
                <mat-option value="diameter2">Diameter 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Sphere</mat-label>
              <mat-select formControlName="leftSphere">
                <mat-option value="sphere1">Sphere 1</mat-option>
                <mat-option value="sphere2">Sphere 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Qty/Boxes</mat-label>
              <input matInput type="number" formControlName="leftQty">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Billed Charges</mat-label>
              <input matInput type="number" formControlName="leftBilledCharges">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>
          </div>

          <div class="total-row">
            <mat-form-field appearance="outline">
              <mat-label>Total Billed</mat-label>
              <input matInput type="number" formControlName="leftTotalBilled">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>

            <button mat-stroked-button color="primary" class="ou-button">
              OU
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .contacts-benefits-card {
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

    .eye-section {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .eye-section:last-child {
      margin-bottom: 0;
    }

    h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .checkbox-row {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    }

    .contacts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .field-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .total-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .total-row mat-form-field {
      width: 200px;
    }

    .ou-button {
      align-self: flex-start;
      min-width: 60px;
      border-radius: 20px;
      border-color: #e0e0e0;
      height: 32px;
    }

    .ou-button.selected {
      background-color: #002F81;
      color: white;
      border-color: #002F81;
    }

    @media (max-width: 768px) {
      .contacts-grid {
        grid-template-columns: 1fr;
      }

      .checkbox-row {
        flex-direction: column;
        gap: 16px;
      }
    }
  `]
})
export class ContactsBenefitsComponent {
  contactsForm: FormGroup;
  diagnosisPointers: string[] = new Array(8).fill('');
  styleOU = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.contactsForm = this.fb.group({
      // Right Eye
      rightSearchFormulary: [false],
      rightSearchToric: [false],
      rightStyle: [''],
      rightColor: [''],
      rightBaseCurve: [''],
      rightDiameter: [''],
      rightSphere: [''],
      rightQty: [''],
      rightBilledCharges: [''],
      rightTotalBilled: [''],

      // Left Eye
      leftSearchFormulary: [false],
      leftSearchToric: [false],
      leftStyle: [''],
      leftColor: [''],
      leftBaseCurve: [''],
      leftDiameter: [''],
      leftSphere: [''],
      leftQty: [''],
      leftBilledCharges: [''],
      leftTotalBilled: ['']
    });
  }

  addDiagnosisCodes() {
    const dialogRef = this.dialog.open(DiagnosisPointersModalComponent, {
      data: { pointers: this.diagnosisPointers }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diagnosisPointers = result;
      }
    });
  }

  toggleOU(field: string) {
    if (field === 'style') {
      this.styleOU = !this.styleOU;
      if (this.styleOU) {
        const rightValue = this.contactsForm.get('rightStyle')?.value;
        this.contactsForm.patchValue({
          leftStyle: rightValue
        });
      }
    }
  }
}