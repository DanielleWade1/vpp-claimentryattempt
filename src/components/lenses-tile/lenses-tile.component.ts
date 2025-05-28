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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
        <!-- Right Eye Section -->
        <div class="eye-section">
          <h3>Right Eye</h3>
          <div formGroupName="rightEye">
            <div class="checkbox-row">
              <mat-checkbox formControlName="bal">Bal</mat-checkbox>
            </div>

            <div class="eye-grid">
              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Sphere</mat-label>
                  <input matInput formControlName="sphere">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="sphereOU"
                        (click)="toggleOU('sphere')">
                  OU
                </button>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Cylinder</mat-label>
                <input matInput formControlName="cylinder">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Axis</mat-label>
                <input matInput formControlName="axis">
              </mat-form-field>

              <div class="pd-type-container">
                <label class="pd-type-label">PD Type</label>
                <mat-radio-group formControlName="pdType">
                  <mat-radio-button value="BI">BI</mat-radio-button>
                  <mat-radio-button value="Mono">Mono</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Dist/Near</mat-label>
                  <input matInput formControlName="distNear">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="distNearOU"
                        (click)="toggleOU('distNear')">
                  OU
                </button>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>OC</mat-label>
                <input matInput formControlName="oc">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>OC Reference</mat-label>
                <mat-select formControlName="ocReference">
                  <mat-option value="option1">Option 1</mat-option>
                  <mat-option value="option2">Option 2</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>BC</mat-label>
                  <input matInput formControlName="bc">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="bcOU"
                        (click)="toggleOU('bc')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Hor Prism</mat-label>
                  <input matInput formControlName="horPrism">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="horPrismOU"
                        (click)="toggleOU('horPrism')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Hor Base Dir</mat-label>
                  <mat-select formControlName="horBaseDir">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                  </mat-select>
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="horBaseDirOU"
                        (click)="toggleOU('horBaseDir')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Vert Prism</mat-label>
                  <input matInput formControlName="vertPrism">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="vertPrismOU"
                        (click)="toggleOU('vertPrism')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Vert Base Dir</mat-label>
                  <mat-select formControlName="vertBaseDir">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                  </mat-select>
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="vertBaseDirOU"
                        (click)="toggleOU('vertBaseDir')">
                  OU
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Left Eye Section -->
        <div class="eye-section">
          <h3>Left Eye</h3>
          <div formGroupName="leftEye">
            <div class="checkbox-row">
              <mat-checkbox formControlName="bal">Bal</mat-checkbox>
            </div>

            <div class="eye-grid">
              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Sphere</mat-label>
                  <input matInput formControlName="sphere">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="sphereOU"
                        (click)="toggleOU('sphere')">
                  OU
                </button>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Cylinder</mat-label>
                <input matInput formControlName="cylinder">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Axis</mat-label>
                <input matInput formControlName="axis">
              </mat-form-field>

              <div class="pd-type-container">
                <label class="pd-type-label">PD Type</label>
                <mat-radio-group formControlName="pdType">
                  <mat-radio-button value="BI">BI</mat-radio-button>
                  <mat-radio-button value="Mono">Mono</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Dist/Near</mat-label>
                  <input matInput formControlName="distNear">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="distNearOU"
                        (click)="toggleOU('distNear')">
                  OU
                </button>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>OC</mat-label>
                <input matInput formControlName="oc">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>OC Reference</mat-label>
                <mat-select formControlName="ocReference">
                  <mat-option value="option1">Option 1</mat-option>
                  <mat-option value="option2">Option 2</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>BC</mat-label>
                  <input matInput formControlName="bc">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="bcOU"
                        (click)="toggleOU('bc')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Hor Prism</mat-label>
                  <input matInput formControlName="horPrism">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="horPrismOU"
                        (click)="toggleOU('horPrism')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Hor Base Dir</mat-label>
                  <mat-select formControlName="horBaseDir">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                  </mat-select>
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="horBaseDirOU"
                        (click)="toggleOU('horBaseDir')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Vert Prism</mat-label>
                  <input matInput formControlName="vertPrism">
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="vertPrismOU"
                        (click)="toggleOU('vertPrism')">
                  OU
                </button>
              </div>

              <div class="field-container">
                <mat-form-field appearance="outline">
                  <mat-label>Vert Base Dir</mat-label>
                  <mat-select formControlName="vertBaseDir">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                  </mat-select>
                </mat-form-field>
                <button mat-stroked-button 
                        class="ou-button" 
                        [class.selected]="vertBaseDirOU"
                        (click)="toggleOU('vertBaseDir')">
                  OU
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 class="section-title">Lenses Details</h2>

        <!-- Right Eye Details -->
        <div class="eye-section">
          <h3>Right Eye Details</h3>
          <div formGroupName="rightEyeDetails">
            <div class="lens-details-grid">
              <mat-form-field appearance="outline">
                <mat-label>Pantoscopic Tilt</mat-label>
                <mat-select formControlName="pantoscopicTilt">
                  <mat-option *ngFor="let option of pantoscopicTiltOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Frame Wrap Angle</mat-label>
                <mat-select formControlName="frameWrapAngle">
                  <mat-option *ngFor="let option of frameWrapAngleOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Vertx</mat-label>
                <mat-select formControlName="vertx">
                  <mat-option *ngFor="let option of vertxOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Eye Rotation Center Distance</mat-label>
                <mat-select formControlName="eyeRotationCenterDistance">
                  <mat-option *ngFor="let option of eyeRotationCenterDistanceOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Natural Head Position</mat-label>
                <mat-select formControlName="naturalHeadPosition">
                  <mat-option *ngFor="let option of naturalHeadPositionOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>H/E Ratio</mat-label>
                <mat-select formControlName="heRatio">
                  
                  <mat-option *ngFor="let option of heRatioOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Stability Coefficient</mat-label>
                <mat-select formControlName="stabilityCoefficient">
                  <mat-option *ngFor="let option of stabilityCoefficientOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Reading Distance</mat-label>
                <mat-select formControlName="readingDistance">
                  <mat-option *ngFor="let option of readingDistanceOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>NVB</mat-label>
                <mat-select formControlName="nvb">
                  <mat-option *ngFor="let option of nvbOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="dominant-eye-section">
              <label class="dominant-eye-label">Dominant Eye</label>
              <mat-radio-group formControlName="isDominant">
                <mat-radio-button [value]="true">Yes</mat-radio-button>
                <mat-radio-button [value]="false">No</mat-radio-button>
              </mat-radio-group>
            </div>
          </div>
        </div>

        <!-- Left Eye Details -->
        <div class="eye-section">
          <h3>Left Eye Details</h3>
          <div formGroupName="leftEyeDetails">
            <div class="lens-details-grid">
              <mat-form-field appearance="outline">
                <mat-label>Pantoscopic Tilt</mat-label>
                <mat-select formControlName="pantoscopicTilt">
                  <mat-option *ngFor="let option of pantoscopicTiltOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Frame Wrap Angle</mat-label>
                <mat-select formControlName="frameWrapAngle">
                  <mat-option *ngFor="let option of frameWrapAngleOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Vertx</mat-label>
                <mat-select formControlName="vertx">
                  <mat-option *ngFor="let option of vertxOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Eye Rotation Center Distance</mat-label>
                <mat-select formControlName="eyeRotationCenterDistance">
                  <mat-option *ngFor="let option of eyeRotationCenterDistanceOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Natural Head Position</mat-label>
                <mat-select formControlName="naturalHeadPosition">
                  <mat-option *ngFor="let option of naturalHeadPositionOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>H/E Ratio</mat-label>
                <mat-select formControlName="heRatio">
                  <mat-option *ngFor="let option of heRatioOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Stability Coefficient</mat-label>
                <mat-select formControlName="stabilityCoefficient">
                  <mat-option *ngFor="let option of stabilityCoefficientOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Reading Distance</mat-label>
                <mat-select formControlName="readingDistance">
                  <mat-option *ngFor="let option of readingDistanceOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>NVB</mat-label>
                <mat-select formControlName="nvb">
                  <mat-option *ngFor="let option of nvbOptions" [value]="option">
                    {{option}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="dominant-eye-section">
              <label class="dominant-eye-label">Dominant Eye</label>
              <mat-radio-group formControlName="isDominant">
                <mat-radio-button [value]="true">Yes</mat-radio-button>
                <mat-radio-button [value]="false">No</mat-radio-button>
              </mat-radio-group>
            </div>
          </div>
        </div>

        <!-- Lens Options Details -->
        <div class="eye-section">
          <h3>Lens Options Details</h3>
          <div formGroupName="lensOptionsDetails">
            <div class="lens-options-grid">
              <!-- Row 1 -->
              <div class="options-row">
                <mat-form-field appearance="outline">
                  <mat-label>Option One</mat-label>
                  <mat-select formControlName="optionOne">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                    <mat-option value="option3">Option 3</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Top</mat-label>
                  <mat-select formControlName="top">
                    <mat-option value="top1">Top 1</mat-option>
                    <mat-option value="top2">Top 2</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Top %</mat-label>
                  <mat-select formControlName="topPercent">
                    <mat-option value="10">10%</mat-option>
                    <mat-option value="20">20%</mat-option>
                    <mat-option value="30">30%</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Bottom</mat-label>
                  <mat-select formControlName="bottom">
                    <mat-option value="bottom1">Bottom 1</mat-option>
                    <mat-option value="bottom2">Bottom 2</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Bottom %</mat-label>
                  <mat-select formControlName="bottomPercent">
                    <mat-option value="10">10%</mat-option>
                    <mat-option value="20">20%</mat-option>
                    <mat-option value="30">30%</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Full</mat-label>
                  <mat-select formControlName="full">
                    <mat-option value="full1">Full 1</mat-option>
                    <mat-option value="full2">Full 2</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Full %</mat-label>
                  <mat-select formControlName="fullPercent">
                    <mat-option value="10">10%</mat-option>
                    <mat-option value="20">20%</mat-option>
                    <mat-option value="30">30%</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="amount-field">
                  <mat-label>Dollar Amount</mat-label>
                  <span matPrefix>$&nbsp;</span>
                  <input matInput type="number" formControlName="dollarAmount1">
                </mat-form-field>
              </div>

              <!-- Row 2 -->
              <div class="options-row">
                <mat-form-field appearance="outline">
                  <mat-label>Option Two</mat-label>
                  <mat-select formControlName="optionTwo">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                    <mat-option value="option3">Option 3</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Full</mat-label>
                  <mat-select formControlName="fullTwo">
                    <mat-option value="full1">Full 1</mat-option>
                    <mat-option value="full2">Full 2</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Full %</mat-label>
                  <mat-select formControlName="fullPercentTwo">
                    <mat-option value="10">10%</mat-option>
                    <mat-option value="20">20%</mat-option>
                    <mat-option value="30">30%</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="amount-field">
                  <mat-label>Dollar Amount</mat-label>
                  <span matPrefix>$&nbsp;</span>
                  <input matInput type="number" formControlName="dollarAmount2">
                </mat-form-field>
              </div>

              <!-- Row 3 -->
              <div class="options-row">
                <mat-form-field appearance="outline">
                  <mat-label>Option Three</mat-label>
                  <mat-select formControlName="optionThree">
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                    <mat-option value="option3">Option 3</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="amount-field">
                  <mat-label>Dollar Amount</mat-label>
                  <span matPrefix>$&nbsp;</span>
                  <input matInput type="number" formControlName="dollarAmount3">
                </mat-form-field>
              </div>
            </div>
          </div>
        </div>

        <mat-card-actions>
          <div class="actions-container">
            <button mat-button color="primary" (click)="clearSection()">Clear Section</button>
            <div class="total-cost">
              <span>Total Lenses Cost</span>
              <span class="amount">{{calculateTotalCost() | number:'1.2-2'}}</span>
            </div>
          </div>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .lenses-card {
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

    .section-title {
      font-size: 18px;
      font-weight: 500;
      color: #333;
      margin: 0 0 24px 0;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;
    }

    .eye-section {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .eye-section h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .checkbox-row {
      margin-bottom: 16px;
    }

    .eye-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .field-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .pd-type-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .pd-type-label {
      color: #666;
      font-size: 14px;
      margin-bottom: 4px;
    }

    mat-radio-group {
      display: flex;
      gap: 16px;
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

    mat-form-field {
      width: 100%;
    }

    .eye-grid mat-form-field {
      height: 55px;
    }

    ::ng-deep .eye-grid .mat-mdc-form-field-flex {
      height: 55px !important;
    }

    ::ng-deep .eye-grid .mat-mdc-text-field-wrapper {
      height: 55px !important;
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

    .lens-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }

    .dominant-eye-section {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }

    .dominant-eye-label {
      display: block;
      margin-bottom: 8px;
    }

    .lens-options-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .options-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      align-items: start;
    }

    .options-row .amount-field {
      justify-self: end;
      min-width: 150px;
    }

    @media (max-width: 1200px) {
      .options-row {
        grid-template-columns: repeat(2, 1fr);
      }

      .options-row .amount-field {
        grid-column: -2 / -1;
      }
    }

    @media (max-width: 768px) {
      .eye-grid {
        grid-template-columns: 1fr;
      }

      .lens-details-grid {
        grid-template-columns: 1fr;
      }

      .options-row {
        grid-template-columns: 1fr;
      }

      .options-row .amount-field {
        grid-column: auto;
      }
    }

    @media (max-width: 480px) {
      .modifiers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LensesTileComponent {
  lensesForm: FormGroup;
  diagnosisPointers: string[] = new Array(8).fill('');

  // OU toggle states
  sphereOU = false;
  distNearOU = false;
  bcOU = false;
  horPrismOU = false;
  horBaseDirOU = false;
  vertPrismOU = false;
  vertBaseDirOU = false;

  // Options for dropdowns
  pantoscopicTiltOptions = ['0°', '2°', '4°', '6°', '8°', '10°'];
  frameWrapAngleOptions = ['0°', '5°', '10°', '15°', '20°'];
  vertxOptions = ['8mm', '10mm', '12mm', '14mm', '16mm'];
  eyeRotationCenterDistanceOptions = ['25mm', '27mm', '29mm', '31mm', '33mm'];
  naturalHeadPositionOptions = ['Normal', 'Tilted Forward', 'Tilted Back'];
  heRatioOptions = ['1.0', '1.2', '1.4', '1.6', '1.8', '2.0'];
  stabilityCoefficientOptions = ['Low', 'Medium', 'High'];
  readingDistanceOptions = ['35cm', '40cm', '45cm', '50cm'];
  nvbOptions = ['Low', 'Medium', 'High'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.lensesForm = this.fb.group({
      rightEyeDetails: this.fb.group({
        pantoscopicTilt: [''],
        frameWrapAngle: [''],
        vertx: [''],
        eyeRotationCenterDistance: [''],
        naturalHeadPosition: [''],
        heRatio: [''],
        stabilityCoefficient: [''],
        readingDistance: [''],
        nvb: [''],
        isDominant: [false]
      }),
      leftEyeDetails: this.fb.group({
        pantoscopicTilt: [''],
        frameWrapAngle: [''],
        vertx: [''],
        eyeRotationCenterDistance: [''],
        naturalHeadPosition: [''],
        heRatio: [''],
        stabilityCoefficient: [''],
        readingDistance: [''],
        nvb: [''],
        isDominant: [false]
      }),
      rightEye: this.fb.group({
        bal: [false],
        sphere: [''],
        cylinder: [''],
        axis: [''],
        pdType: ['BI'],
        distNear: [''],
        oc: [''],
        ocReference: [''],
        bc: [''],
        horPrism: [''],
        horBaseDir: [''],
        vertPrism: [''],
        vertBaseDir: ['']
      }),
      leftEye: this.fb.group({
        bal: [false],
        sphere: [''],
        cylinder: [''],
        axis: [''],
        pdType: ['BI'],
        distNear: [''],
        oc: [''],
        ocReference: [''],
        bc: [''],
        horPrism: [''],
        horBaseDir: [''],
        vertPrism: [''],
        vertBaseDir: ['']
      }),
      lensOptionsDetails: this.fb.group({
        // Row 1
        optionOne: [''],
        top: [''],
        topPercent: [''],
        bottom: [''],
        bottomPercent: [''],
        full: [''],
        fullPercent: [''],
        dollarAmount1: [null],

        // Row 2
        optionTwo: [''],
        fullTwo: [''],
        fullPercentTwo: [''],
        dollarAmount2: [null],

        // Row 3
        optionThree: [''],
        dollarAmount3: [null]
      })
    });
  }

  toggleOU(field: string) {
    switch (field) {
      case 'sphere':
        this.sphereOU = !this.sphereOU;
        break;
      case 'distNear':
        this.distNearOU = !this.distNearOU;
        break;
      case 'bc':
        this.bcOU = !this.bcOU;
        break;
      case 'horPrism':
        this.horPrismOU = !this.horPrismOU;
        break;
      case 'horBaseDir':
        this.horBaseDirOU = !this.horBaseDirOU;
        break;
      case 'vertPrism':
        this.vertPrismOU = !this.vertPrismOU;
        break;
      case 'vertBaseDir':
        this.vertBaseDirOU = !this.vertBaseDirOU;
        break;
    }
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

  calculateTotalCost(): number {
    const lensOptionsAmount1 = this.lensesForm.get('lensOptionsDetails.dollarAmount1')?.value || 0;
    const lensOptionsAmount2 = this.lensesForm.get('lensOptionsDetails.dollarAmount2')?.value || 0;
    const lensOptionsAmount3 = this.lensesForm.get('lensOptionsDetails.dollarAmount3')?.value || 0;
    return lensOptionsAmount1 + lensOptionsAmount2 + lensOptionsAmount3;
  }

  clearSection() {
    this.lensesForm.reset({
      rightEye: {
        bal: false,
        pdType: 'BI'
      },
      leftEye: {
        bal: false,
        pdType: 'BI'
      },
      rightEyeDetails: {
        isDominant: false
      },
      leftEyeDetails: {
        isDominant: false
      },
      lensOptionsDetails: {
        optionOne: '',
        top: '',
        topPercent: '',
        bottom: '',
        bottomPercent: '',
        full: '',
        fullPercent: '',
        dollarAmount1: null,
        optionTwo: '',
        fullTwo: '',
        fullPercentTwo: '',
        dollarAmount2: null,
        optionThree: '',
        dollarAmount3: null
      }
    });
    
    // Reset OU toggles
    this.sphereOU = false;
    this.distNearOU = false;
    this.bcOU = false;
    this.horPrismOU = false;
    this.horBaseDirOU = false;
    this.vertPrismOU = false;
    this.vertBaseDirOU = false;
  }
}