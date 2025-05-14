import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DiagnosisPointersModalComponent } from '../diagnosis-pointers-modal/diagnosis-pointers-modal.component';

@Component({
  selector: 'app-lenses-tile',
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
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  template: `
    <mat-card class="lenses-card">
      <mat-card-header>
        <mat-card-title>Lenses</mat-card-title>
        <div class="header-actions">
          <button mat-button color="primary" (click)="addDiagnosisCodes()">
            Add Diagnosis Codes
          </button>
        </div>
      </mat-card-header>

      <mat-card-content [formGroup]="lensesForm">
        <div class="lens-options">
          <mat-radio-group formControlName="lensOption">
            <mat-radio-button value="lensesOrder">Lenses Order</mat-radio-button>
            <mat-radio-button value="lensesOnly">Lenses Only, Provider to Mount</mat-radio-button>
          </mat-radio-group>
        </div>

        <!-- Right Eye Section -->
        <div class="eye-section">
          <h3>Right Eye</h3>
          <div class="eye-grid">
            <mat-checkbox formControlName="rightBal">Bal</mat-checkbox>
            
            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Sphere</mat-label>
                <input matInput formControlName="rightSphere">
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('sphere')">OU</button>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Cylinder</mat-label>
              <input matInput formControlName="rightCylinder">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Axis</mat-label>
              <input matInput formControlName="rightAxis">
            </mat-form-field>

            <div class="pd-type">
              <mat-radio-group formControlName="rightPDType">
                <mat-radio-button value="bi">BI</mat-radio-button>
                <mat-radio-button value="mono">Mono</mat-radio-button>
              </mat-radio-group>
            </div>

            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Dist/Near</mat-label>
                <input matInput formControlName="rightDistNear">
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('distNear')">OU</button>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>OC</mat-label>
              <input matInput formControlName="rightOC">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>OC Reference</mat-label>
              <mat-select formControlName="rightOCReference">
                <mat-option value="ref1">Reference 1</mat-option>
                <mat-option value="ref2">Reference 2</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>BC</mat-label>
                <input matInput formControlName="rightBC">
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('bc')">OU</button>
            </div>

            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Hor Prism</mat-label>
                <input matInput formControlName="rightHorPrism">
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('horPrism')">OU</button>
            </div>

            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Hor Base Dir</mat-label>
                <mat-select formControlName="rightHorBaseDir">
                  <mat-option value="dir1">Direction 1</mat-option>
                  <mat-option value="dir2">Direction 2</mat-option>
                </mat-select>
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('horBaseDir')">OU</button>
            </div>

            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Vert Prism</mat-label>
                <input matInput formControlName="rightVertPrism">
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('vertPrism')">OU</button>
            </div>

            <div class="field-row">
              <mat-form-field appearance="outline">
                <mat-label>Vert Base Dir</mat-label>
                <mat-select formControlName="rightVertBaseDir">
                  <mat-option value="dir1">Direction 1</mat-option>
                  <mat-option value="dir2">Direction 2</mat-option>
                </mat-select>
              </mat-form-field>
              <button mat-button class="ou-button" (click)="copyToLeft('vertBaseDir')">OU</button>
            </div>
          </div>
        </div>

        <!-- Left Eye Section -->
        <div class="eye-section">
          <h3>Left Eye</h3>
          <div class="eye-grid">
            <mat-checkbox formControlName="leftBal">Bal</mat-checkbox>
            
            <mat-form-field appearance="outline">
              <mat-label>Sphere</mat-label>
              <input matInput formControlName="leftSphere">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Cylinder</mat-label>
              <input matInput formControlName="leftCylinder">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Axis</mat-label>
              <input matInput formControlName="leftAxis">
            </mat-form-field>

            <div class="pd-type">
              <mat-radio-group formControlName="leftPDType">
                <mat-radio-button value="bi">BI</mat-radio-button>
                <mat-radio-button value="mono">Mono</mat-radio-button>
              </mat-radio-group>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Dist/Near</mat-label>
              <input matInput formControlName="leftDistNear">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>OC</mat-label>
              <input matInput formControlName="leftOC">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>OC Reference</mat-label>
              <mat-select formControlName="leftOCReference">
                <mat-option value="ref1">Reference 1</mat-option>
                <mat-option value="ref2">Reference 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>BC</mat-label>
              <input matInput formControlName="leftBC">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Hor Prism</mat-label>
              <input matInput formControlName="leftHorPrism">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Hor Base Dir</mat-label>
              <mat-select formControlName="leftHorBaseDir">
                <mat-option value="dir1">Direction 1</mat-option>
                <mat-option value="dir2">Direction 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Vert Prism</mat-label>
              <input matInput formControlName="leftVertPrism">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Vert Base Dir</mat-label>
              <mat-select formControlName="leftVertBaseDir">
                <mat-option value="dir1">Direction 1</mat-option>
                <mat-option value="dir2">Direction 2</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>

        <!-- Lenses Section -->
        <div class="lenses-section">
          <h3>Lenses</h3>
          <div class="lenses-grid">
            <mat-form-field appearance="outline">
              <mat-label>Lens Style</mat-label>
              <mat-select formControlName="lensStyle">
                <mat-option value="style1">Style 1</mat-option>
                <mat-option value="style2">Style 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-checkbox formControlName="enterProcedureCode">
              Enter Procedure Code for Left/Right Eye
            </mat-checkbox>

            <mat-form-field appearance="outline">
              <mat-label>Dollar Amount</mat-label>
              <input matInput type="number" formControlName="dollarAmount">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>
          </div>

          <!-- Right Eye Procedure -->
          <div class="procedure-section" *ngIf="lensesForm.get('enterProcedureCode')?.value">
            <h4>Right Eye</h4>
            <div class="procedure-grid">
              <mat-form-field appearance="outline">
                <mat-label>Procedure Code</mat-label>
                <mat-select formControlName="rightProcedureCode">
                  <mat-option value="code1">Code 1</mat-option>
                  <mat-option value="code2">Code 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Dollar Amount</mat-label>
                <input matInput type="number" formControlName="rightProcedureAmount">
                <span matPrefix>$&nbsp;</span>
              </mat-form-field>
            </div>

            <div class="measurements-grid">
              <mat-form-field appearance="outline">
                <mat-label>Pantoscopic Tilt</mat-label>
                <mat-select formControlName="rightPantoscopicTilt">
                  <mat-option value="tilt1">Tilt 1</mat-option>
                  <mat-option value="tilt2">Tilt 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Frame Wrap Angle</mat-label>
                <mat-select formControlName="rightFrameWrapAngle">
                  <mat-option value="angle1">Angle 1</mat-option>
                  <mat-option value="angle2">Angle 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Vertex</mat-label>
                <mat-select formControlName="rightVertex">
                  <mat-option value="vertex1">Vertex 1</mat-option>
                  <mat-option value="vertex2">Vertex 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Eye Rotation Center Distance</mat-label>
                <mat-select formControlName="rightEyeRotation">
                  <mat-option value="dist1">Distance 1</mat-option>
                  <mat-option value="dist2">Distance 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Natural Head Position</mat-label>
                <mat-select formControlName="rightHeadPosition">
                  <mat-option value="pos1">Position 1</mat-option>
                  <mat-option value="pos2">Position 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>H/E Ratio</mat-label>
                <mat-select formControlName="rightHERatio">
                  <mat-option value="ratio1">Ratio 1</mat-option>
                  <mat-option value="ratio2">Ratio 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Stability Coefficient</mat-label>
                <mat-select formControlName="rightStabilityCoeff">
                  <mat-option value="coeff1">Coefficient 1</mat-option>
                  <mat-option value="coeff2">Coefficient 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Reading Distance</mat-label>
                <mat-select formControlName="rightReadingDistance">
                  <mat-option value="dist1">Distance 1</mat-option>
                  <mat-option value="dist2">Distance 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-checkbox formControlName="rightDominant">Dominant</mat-checkbox>

              <mat-form-field appearance="outline">
                <mat-label>NVB</mat-label>
                <mat-select formControlName="rightNVB">
                  <mat-option value="nvb1">NVB 1</mat-option>
                  <mat-option value="nvb2">NVB 2</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>

          <!-- Left Eye Procedure -->
          <div class="procedure-section" *ngIf="lensesForm.get('enterProcedureCode')?.value">
            <h4>Left Eye</h4>
            <div class="procedure-grid">
              <mat-form-field appearance="outline">
                <mat-label>Procedure Code</mat-label>
                <mat-select formControlName="leftProcedureCode">
                  <mat-option value="code1">Code 1</mat-option>
                  <mat-option value="code2">Code 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Dollar Amount</mat-label>
                <input matInput type="number" formControlName="leftProcedureAmount">
                <span matPrefix>$&nbsp;</span>
              </mat-form-field>
            </div>

            <div class="measurements-grid">
              <mat-form-field appearance="outline">
                <mat-label>Pantoscopic Tilt</mat-label>
                <mat-select formControlName="leftPantoscopicTilt">
                  <mat-option value="tilt1">Tilt 1</mat-option>
                  <mat-option value="tilt2">Tilt 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Frame Wrap Angle</mat-label>
                <mat-select formControlName="leftFrameWrapAngle">
                  <mat-option value="angle1">Angle 1</mat-option>
                  <mat-option value="angle2">Angle 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Vertex</mat-label>
                <mat-select formControlName="leftVertex">
                  <mat-option value="vertex1">Vertex 1</mat-option>
                  <mat-option value="vertex2">Vertex 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Eye Rotation Center Distance</mat-label>
                <mat-select formControlName="leftEyeRotation">
                  <mat-option value="dist1">Distance 1</mat-option>
                  <mat-option value="dist2">Distance 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Natural Head Position</mat-label>
                <mat-select formControlName="leftHeadPosition">
                  <mat-option value="pos1">Position 1</mat-option>
                  <mat-option value="pos2">Position 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>H/E Ratio</mat-label>
                <mat-select formControlName="leftHERatio">
                  <mat-option value="ratio1">Ratio 1</mat-option>
                  <mat-option value="ratio2">Ratio 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Stability Coefficient</mat-label>
                <mat-select formControlName="leftStabilityCoeff">
                  <mat-option value="coeff1">Coefficient 1</mat-option>
                  <mat-option value="coeff2">Coefficient 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Reading Distance</mat-label>
                <mat-select formControlName="leftReadingDistance">
                  <mat-option value="dist1">Distance 1</mat-option>
                  <mat-option value="dist2">Distance 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-checkbox formControlName="leftDominant">Dominant</mat-checkbox>

              <mat-form-field appearance="outline">
                <mat-label>NVB</mat-label>
                <mat-select formControlName="leftNVB">
                  <mat-option value="nvb1">NVB 1</mat-option>
                  <mat-option value="nvb2">NVB 2</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>

          <!-- Lens Material and Treatment -->
          <div class="lens-material-treatment">
            <div class="material-row">
              <mat-form-field appearance="outline">
                <mat-label>Lens Material</mat-label>
                <mat-select formControlName="lensMaterial">
                  <mat-option value="material1">Material 1</mat-option>
                  <mat-option value="material2">Material 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Dollar Amount</mat-label>
                <input matInput type="number" formControlName="lensMaterialAmount">
                <span matPrefix>$&nbsp;</span>
              </mat-form-field>
            </div>

            <div class="treatment-row">
              <mat-form-field appearance="outline">
                <mat-label>Lens Treatment</mat-label>
                <mat-select formControlName="lensTreatment">
                  <mat-option value="treatment1">Treatment 1</mat-option>
                  <mat-option value="treatment2">Treatment 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Dollar Amount</mat-label>
                <input matInput type="number" formControlName="lensTreatmentAmount">
                <span matPrefix>$&nbsp;</span>
              </mat-form-field>
            </div>
          </div>
        </div>

        <!-- Lens Options -->
        <div class="lens-options-section">
          <h3>Lens Options</h3>
          
          <!-- Option One -->
          <div class="option-row">
            <mat-form-field appearance="outline">
              <mat-label>Option 1</mat-label>
              <mat-select formControlName="option1">
                <mat-option value="opt1">Option 1</mat-option>
                <mat-option value="opt2">Option 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Top</mat-label>
              <mat-select formControlName="option1Top">
                <mat-option value="top1">Top 1</mat-option>
                <mat-option value="top2">Top 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Top %</mat-label>
              <mat-select formControlName="option1TopPercent">
                <mat-option value="25">25%</mat-option>
                <mat-option value="50">50%</mat-option>
                <mat-option value="75">75%</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Bottom</mat-label>
              <mat-select formControlName="option1Bottom">
                <mat-option value="bottom1">Bottom 1</mat-option>
                <mat-option value="bottom2">Bottom 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Bottom %</mat-label>
              <mat-select formControlName="option1BottomPercent">
                <mat-option value="25">25%</mat-option>
                <mat-option value="50">50%</mat-option>
                <mat-option value="75">75%</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Full</mat-label>
              <mat-select formControlName="option1Full">
                <mat-option value="full1">Full 1</mat-option>
                <mat-option value="full2">Full 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Full %</mat-label>
              <mat-select formControlName="option1FullPercent">
                <mat-option value="25">25%</mat-option>
                <mat-option value="50">50%</mat-option>
                <mat-option value="75">75%</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Dollar Amount</mat-label>
              <input matInput type="number" formControlName="option1Amount">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>
          </div>

          <!-- Option Two -->
          <div class="option-row">
            <mat-form-field appearance="outline">
              <mat-label>Option 2</mat-label>
              <mat-select formControlName="option2">
                <mat-option value="opt1">Option 1</mat-option>
                <mat-option value="opt2">Option 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Full</mat-label>
              <mat-select formControlName="option2Full">
                <mat-option value="full1">Full 1</mat-option>
                <mat-option value="full2">Full 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Full %</mat-label>
              <mat-select formControlName="option2FullPercent">
                <mat-option value="25">25%</mat-option>
                <mat-option value="50">50%</mat-option>
                <mat-option value="75">75%</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Dollar Amount</mat-label>
              <input matInput type="number" formControlName="option2Amount">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>
          </div>

          <!-- Option Three -->
          <div class="option-row">
            <mat-form-field appearance="outline">
              <mat-label>Option 3</mat-label>
              <mat-select formControlName="option3">
                <mat-option value="opt1">Option 1</mat-option>
                <mat-option value="opt2">Option 2</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Dollar Amount</mat-label>
              <input matInput type="number" formControlName="option3Amount">
              <span matPrefix>$&nbsp;</span>
            </mat-form-field>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .lenses-card {
      margin: 24px 0;
    }

    mat-card-header {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .lens-options {
      margin-bottom: 24px;
    }

    .lens-options mat-radio-group {
      display: flex;
      gap: 24px;
    }

    .eye-section {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    h4 {
      margin: 16px 0;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    .eye-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .field-row {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .field-row mat-form-field {
      flex: 1;
    }

    .ou-button {
      margin-top: 4px;
      min-width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 20px;
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .pd-type {
      margin: 8px 0;
    }

    .pd-type mat-radio-group {
      display: flex;
      gap: 16px;
    }

    .lenses-section {
      margin-top: 24px;
    }

    .lenses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .procedure-section {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .procedure-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .measurements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .lens-material-treatment {
      margin: 24px 0;
    }

    .material-row,
    .treatment-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .lens-options-section {
      margin-top: 24px;
    }

    .option-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
      align-items: start;
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 768px) {
      .eye-grid,
      .lenses-grid,
      .procedure-grid,
      .measurements-grid,
      .material-row,
      .treatment-row,
      .option-row {
        grid-template-columns: 1fr;
      }

      .field-row {
        flex-direction: column;
      }

      .ou-button {
        align-self: center;
      }
    }
  `]
})
export class LensesTileComponent {
  lensesForm: FormGroup;
  diagnosisPointers: string[] = new Array(8).fill('');

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.lensesForm = this.fb.group({
      lensOption: ['lensesOrder'],
      
      // Right Eye
      rightBal: [false],
      rightSphere: [''],
      rightCylinder: [''],
      rightAxis: [''],
      rightPDType: ['bi'],
      rightDistNear: [''],
      rightOC: [''],
      rightOCReference: [''],
      rightBC: [''],
      rightHorPrism: [''],
      rightHorBaseDir: [''],
      rightVertPrism: [''],
      rightVertBaseDir: [''],

      // Left Eye
      leftBal: [false],
      leftSphere: [''],
      leftCylinder: [''],
      leftAxis: [''],
      leftPDType: ['bi'],
      leftDistNear: [''],
      leftOC: [''],
      leftOCReference: [''],
      leftBC: [''],
      leftHorPrism: [''],
      leftHorBaseDir: [''],
      leftVertPrism: [''],
      leftVertBaseDir: [''],

      // Lenses
      lensStyle: [''],
      enterProcedureCode: [false],
      dollarAmount: [''],

      // Right Eye Procedure
      rightProcedureCode: [''],
      rightProcedureAmount: [''],
      rightPantoscopicTilt: [''],
      rightFrameWrapAngle: [''],
      rightVertex: [''],
      rightEyeRotation: [''],
      rightHeadPosition: [''],
      rightHERatio: [''],
      rightStabilityCoeff: [''],
      rightReadingDistance: [''],
      rightDominant: [false],
      rightNVB: [''],

      // Left Eye Procedure
      leftProcedureCode: [''],
      leftProcedureAmount: [''],
      leftPantoscopicTilt: [''],
      leftFrameWrapAngle: [''],
      leftVertex: [''],
      leftEyeRotation: [''],
      leftHeadPosition: [''],
      leftHERatio: [''],
      leftStabilityCoeff: [''],
      leftReadingDistance: [''],
      leftDominant: [false],
      leftNVB: [''],

      // Lens Material and Treatment
      lensMaterial: [''],
      lensMaterialAmount: [''],
      lensTreatment: [''],
      lensTreatmentAmount: [''],

      // Lens Options
      option1: [''],
      option1Top: [''],
      option1TopPercent: [''],
      option1Bottom: [''],
      option1BottomPercent: [''],
      option1Full: [''],
      option1FullPercent: [''],
      option1Amount: [''],

      option2: [''],
      option2Full: [''],
      option2FullPercent: [''],
      option2Amount: [''],

      option3: [''],
      option3Amount: ['']
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

  copyToLeft(field: string) {
    const rightValue = this.lensesForm.get(`right${field}`)?.value;
    if (rightValue !== undefined && rightValue !== null) {
      this.lensesForm.patchValue({
        [`left${field}`]: rightValue
      });
    }
  }
}