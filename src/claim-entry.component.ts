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
    LensesTileComponent
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

        <mat-card class="exam-card">
          <mat-card-header>
            <mat-card-title>Exam</mat-card-title>
            <div class="header-actions">
              <button mat-button color="primary" (click)="addDiagnosisCodes()">
                Add Diagnosis Codes
              </button>
            </div>
          </mat-card-header>

          <mat-card-content [formGroup]="examForm">
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
                    <mat-select formControlName="procedureCode2" [disabled]="!examForm.get('procedureCode1')?.value">
                      <mat-option value="code1">Code 1</mat-option>
                      <mat-option value="code2">Code 2</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="procedure-amount">
                  <label>Procedure Code Amount</label>
                  <mat-form-field appearance="outline">
                    <span matPrefix>$&nbsp;</span>
                    <input matInput type="number" formControlName="procedureAmount2" [disabled]="!examForm.get('procedureCode1')?.value">
                  </mat-form-field>
                </div>
              </div>

              <div class="procedure-row">
                <div class="procedure-code">
                  <label>Procedure Code 3</label>
                  <mat-form-field appearance="outline">
                    <mat-select formControlName="procedureCode3" [disabled]="!examForm.get('procedureCode1')?.value">
                      <mat-option value="code1">Code 1</mat-option>
                      <mat-option value="code2">Code 2</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div class="procedure-amount">
                  <label>Procedure Code Amount</label>
                  <mat-form-field appearance="outline">
                    <span matPrefix>$&nbsp;</span>
                    <input matInput type="number" formControlName="procedureAmount3" [disabled]="!examForm.get('procedureCode1')?.value">
                  </mat-form-field>
                </div>
              </div>

              <div class="medically-necessary-section">
                <mat-checkbox formControlName="medicallyNecessary">Medically necessary</mat-checkbox>
              </div>

              <div class="modifiers-section" *ngIf="examForm.get('medicallyNecessary')?.value">
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

            <div class="exam-questions">
              <div class="question-row">
                <label>Dilated retinal exam performed:</label>
                <mat-radio-group formControlName="dilatedExam">
                  <mat-radio-button [value]="true">Yes</mat-radio-button>
                  <mat-radio-button [value]="false">No</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="question-row">
                <label>Patient tested for glaucoma:</label>
                <mat-radio-group formControlName="glaucomaTested">
                  <mat-radio-button [value]="true">Yes</mat-radio-button>
                  <mat-radio-button [value]="false">No</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="question-row">
                <label>Is this patient known to have diabetes:</label>
                <mat-radio-group formControlName="hasDiabetes">
                  <mat-radio-button [value]="true">Yes</mat-radio-button>
                  <mat-radio-button [value]="false">No</mat-radio-button>
                </mat-radio-group>
              </div>

              <div class="diabetes-fields" *ngIf="examForm.get('hasDiabetes')?.value">
                <div class="diabetes-code">
                  <mat-form-field appearance="outline">
                    <mat-label>Diagnosis Code</mat-label>
                    <mat-select formControlName="diabetesDiagnosisCode">
                      <mat-option value="code1">Code 1</mat-option>
                      <mat-option value="code2">Code 2</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="cptii-code">
                  <mat-form-field appearance="outline">
                    <mat-label>CPTII</mat-label>
                    <mat-select formControlName="diabetesCPTII">
                      <mat-option value="code1">Code 1</mat-option>
                      <mat-option value="code2">Code 2</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <div class="actions-container">
              <button mat-button color="primary" (click)="clearExamSection()">Clear Section</button>
              <div class="total-cost">
                <span>Total Exam Cost</span>
                <span class="amount">{{calculateTotalExamCost() | number:'1.2-2'}}</span>
              </div>
            </div>
          </mat-card-actions>
        </mat-card>

        <app-contact-fit></app-contact-fit>
        <app-contacts-benefits></app-contacts-benefits>
        <app-eyeglasses-tile></app-eyeglasses-tile>
        <app-lenses-tile></app-lenses-tile>
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

    .exam-card {
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 24px;
    }

    mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    mat-card-content {
      padding: 16px;
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

    .exam-questions {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .question-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    mat-radio-group {
      display: flex;
      gap: 16px;
    }

    .diabetes-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 16px;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
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

    @media (max-width: 1200px) {
      .diagnosis-grid {
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

      .modifiers-grid {
        grid-template-columns: repeat(2, 1fr);
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
  diagnosisForm = this.fb.group({
    primaryDiagnosis: ['', Validators.required],
    diagnosisCode2: [''],
    diagnosisCode3: [''],
    diagnosisCode4: [''],
    hasDiabetes: ['no', Validators.required],
    isReferred: ['no', Validators.required],
    referralCode: ['']
  });

  examForm = this.fb.group({
    procedureCode1: ['', Validators.required],
    procedureAmount1: [null, [Validators.required, Validators.min(0)]],
    procedureCode2: [''],
    procedureAmount2: [null],
    procedureCode3: [''],
    procedureAmount3: [null],
    medicallyNecessary: [false],
    modifier1: [''],
    modifier2: [''],
    modifier3: [''],
    modifier4: [''],
    dilatedExam: [false],
    glaucomaTested: [false],
    hasDiabetes: [false],
    diabetesDiagnosisCode: [''],
    diabetesCPTII: ['']
  });

  private diagnosisCodesSubject = new BehaviorSubject<DiagnosisCode[]>([]);
  diagnosisCodes$ = this.diagnosisCodesSubject.asObservable();
  diagnosisPointers: string[] = new Array(8).fill('');

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

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

    this.examForm.get('hasDiabetes')?.valueChanges.subscribe(value => {
      const controls = ['diabetesDiagnosisCode', 'diabetesCPTII'];
      controls.forEach(controlName => {
        const control = this.examForm.get(controlName);
        if (value) {
          control?.setValidators([Validators.required]);
        } else {
          control?.clearValidators();
          control?.setValue(null);
        }
        control?.updateValueAndValidity();
      });
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

  calculateTotalExamCost(): number {
    const amount1 = this.examForm.get('procedureAmount1')?.value || 0;
    const amount2 = this.examForm.get('procedureAmount2')?.value || 0;
    const amount3 = this.examForm.get('procedureAmount3')?.value || 0;
    return amount1 + amount2 + amount3;
  }

  clearExamSection() {
    this.examForm.reset({
      dilatedExam: false,
      glaucomaTested: false,
      hasDiabetes: false,
      medicallyNecessary: false
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

export { ClaimEntryComponent }