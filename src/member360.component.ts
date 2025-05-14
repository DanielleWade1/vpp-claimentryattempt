import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSelectorComponent } from './action-selector.component';

interface ServiceCategory {
  name: string;
  status: 'Available' | 'Unavailable';
  selected: boolean;
  disabled: boolean;
  nextAvailable?: string;
}

interface BenefitGroup {
  name: string;
  note?: string;
  categories: ServiceCategory[];
}

@Component({
  selector: 'app-member360',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    ActionSelectorComponent
  ],
  template: `
    <div class="app-container">
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

      <div class="claim360-container">
        <mat-stepper [selectedIndex]="0" class="claim-stepper">
          <mat-step label="Claim 360" state="claim360" completed="true">
          </mat-step>
          <mat-step label="Claim Entry" state="entry">
          </mat-step>
          <mat-step label="Review" state="review">
          </mat-step>
        </mat-stepper>

        <h1 class="page-title">Claim 360</h1>
        <div class="content-section">
          <div class="section-header">
            <h2>Selected Information</h2>
            <button class="update-link" (click)="updateInformation()">Update Selected Information</button>
          </div>

          <div class="info-tiles">
            <mat-card class="info-card">
              <mat-card-content>
                <h3>Patient: {{patientInfo.name}} (DOB {{patientInfo.dob}})</h3>
                <p>{{patientInfo.address}}</p>
                <p>{{patientInfo.city}}, {{patientInfo.state}} {{patientInfo.zip}}</p>
              </mat-card-content>
            </mat-card>

            <mat-card class="info-card">
              <mat-card-content>
                <h3>Provider: {{providerInfo.name}}</h3>
                <p>{{providerInfo.practice}}</p>
                <p>{{providerInfo.address}}</p>
                <p>{{providerInfo.city}}, {{providerInfo.state}} {{providerInfo.zip}}</p>
              </mat-card-content>
            </mat-card>
          </div>

          <div class="product-section">
            <div class="product-tiles">
              <mat-card class="product-selector">
                <mat-card-content>
                  <h3>Select Product</h3>
                  <mat-form-field appearance="outline" class="product-select">
                    <mat-select [(value)]="selectedProduct">
                      <mat-option *ngFor="let product of products" [value]="product.id">
                        {{product.name}}
                        <span *ngIf="product.recommended" class="recommended-tag">Recommended</span>
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                  <div class="product-info">
                    <div class="info-item">
                      <span class="label">Eyeglasses:</span>
                      <span class="value">Provider Claim and Order</span>
                      <mat-icon class="info-icon" [matTooltip]="'Information about eyeglasses claims and orders'">info</mat-icon>
                    </div>
                    <div class="info-item">
                      <span class="label">Contact Lenses:</span>
                      <span class="value">Provider Claim Only</span>
                      <mat-icon class="info-icon" [matTooltip]="'Information about contact lens claims'">info</mat-icon>
                    </div>
                    <div class="info-item">
                      <span class="label">Entry Restrictions:</span>
                      <span class="value">None</span>
                      <mat-icon class="info-icon" [matTooltip]="'Information about entry restrictions'">info</mat-icon>
                    </div>
                  </div>
                  <p class="helper-text">Other plans are available</p>
                </mat-card-content>
              </mat-card>

              <mat-card class="product-details">
                <mat-card-content>
                  <h3>Selected Product Details</h3>
                  <div class="details-grid">
                    <div class="grid-item">
                      <span class="label">Eligibility Status</span>
                      <span class="value">
                        <span class="status-badge active">Active</span>
                      </span>
                    </div>
                    <div class="grid-item">
                      <span class="label">Date of Service</span>
                      <span class="value">{{selectedDate}}</span>
                    </div>
                    <div class="grid-item">
                      <span class="label">Product Class/Group</span>
                      <span class="value">{{productDetails.classGroup}}</span>
                    </div>
                    <div class="grid-item">
                      <span class="label">Effective Dates</span>
                      <span class="value">{{productDetails.effectiveDates}}</span>
                    </div>
                    <div class="grid-item">
                      <span class="label">Client Product ID</span>
                      <span class="value">{{productDetails.clientProductId}}</span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>

          <div class="action-toggles">
            <app-action-selector (actionChange)="selectedAction = $event"></app-action-selector>
          </div>
        </div>

        <div class="services-section">
          <h2 class="services-header">{{selectedAction === 'claim' ? 'Claim Entry Services' : 'Authorization Entry Services'}}</h2>
          
          <div *ngIf="hasGlassesOrder" class="banner-message">
            Glasses Order Generated
          </div>
          <div *ngIf="hasContactLensOrder" class="banner-message">
            Contact Lenses Order Generated
          </div>

          <div class="services-grid">
            <mat-card class="services-card">
              <mat-card-content>
                <h2>Professional Services</h2>
                <p class="selection-note">Select each coverage category only once</p>
                
                <table class="services-table">
                  <thead>
                    <tr>
                      <th>Benefit</th>
                      <th>Coverage Category</th>
                      <th>Status</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ng-container *ngFor="let benefit of professionalBenefits">
                      <tr *ngFor="let category of benefit.categories; let first = first" 
                          [class.benefit-group-start]="first"
                          [class.disabled-row]="category.disabled">
                        <td *ngIf="first" [attr.rowspan]="benefit.categories.length" class="benefit-name">
                          {{benefit.name}}
                          <span *ngIf="benefit.note" class="benefit-note">({{benefit.note}})</span>
                        </td>
                        <td>{{category.name}}</td>
                        <td>
                          <span *ngIf="category.nextAvailable" class="status-pill next-available">
                            Next available {{category.nextAvailable}}
                          </span>
                          <span *ngIf="!category.nextAvailable" 
                                class="status-pill"
                                [class.available]="category.status === 'Available'"
                                [class.unavailable]="category.status === 'Unavailable'">
                            {{category.status}}
                          </span>
                        </td>
                        <td>
                          <div class="checkbox-container" [class.disabled]="category.disabled">
                            <mat-checkbox 
                              [(ngModel)]="category.selected"
                              [disabled]="category.disabled || category.status === 'Unavailable'"
                              (change)="onProfessionalServiceSelect(benefit.name, category)">
                            </mat-checkbox>
                            <span *ngIf="category.disabled" class="disabled-x">×</span>
                          </div>
                        </td>
                      </tr>
                    </ng-container>
                  </tbody>
                </table>
              </mat-card-content>
            </mat-card>

            <mat-card class="services-card">
              <mat-card-content>
                <h2>Materials</h2>
                <p class="selection-note">Select coverage categories in only one benefit</p>
                
                <table class="services-table">
                  <thead>
                    <tr>
                      <th>Benefit</th>
                      <th>Coverage Category</th>
                      <th>Status</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ng-container *ngFor="let benefit of materialBenefits">
                      <tr *ngFor="let category of benefit.categories; let first = first" 
                          [class.benefit-group-start]="first"
                          [class.disabled-row]="category.disabled">
                        <td *ngIf="first" [attr.rowspan]="benefit.categories.length" class="benefit-name">
                          {{benefit.name}}
                          <span *ngIf="benefit.note" class="benefit-note">({{benefit.note}})</span>
                        </td>
                        <td>{{category.name}}</td>
                        <td>
                          <span class="status-pill"
                                [class.available]="category.status === 'Available'"
                                [class.unavailable]="category.status === 'Unavailable'">
                            {{category.status}}
                          </span>
                        </td>
                        <td>
                          <div class="checkbox-container" [class.disabled]="category.disabled">
                            <mat-checkbox 
                              [(ngModel)]="category.selected"
                              [disabled]="category.disabled"
                              (change)="onMaterialServiceSelect(benefit.name, category)">
                            </mat-checkbox>
                            <span *ngIf="category.disabled" class="disabled-x">×</span>
                          </div>
                        </td>
                      </tr>
                    </ng-container>
                  </tbody>
                </table>
              </mat-card-content>
            </mat-card>
          </div>

          <div class="stepper-buttons">
            <button mat-raised-button color="primary" class="continue-button" (click)="navigateToClaimEntry()">Continue</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .claim360-container {
      max-width: 1800px;
      margin: 0 auto;
      padding: 24px;
      width: 100%;
      box-sizing: border-box;
    }

    .claim-stepper {
      margin-bottom: 24px;
    }

    ::ng-deep .claim-stepper .mat-horizontal-stepper-header-container {
      background: transparent;
    }

    ::ng-deep .claim-stepper .mat-step-header {
      padding: 24px 16px;
      background: transparent;
    }

    ::ng-deep .claim-stepper .mat-step-label {
      font-size: 16px;
      font-weight: 500;
    }

    .page-title {
      font-size: 32px;
      font-weight: 500;
      color: #333;
      margin: 0 0 24px 0;
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

    .content-section {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 24px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .section-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }

    .update-link {
      color: #1976d2;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }

    .info-tiles {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 24px;
    }

    .info-card {
      border-radius: 8px;
      background-color: rgb(249, 250, 251);
      border: 1px solid rgb(229, 231, 235);
    }

    .info-card h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      font-weight: 500;
    }

    .info-card p {
      margin: 0 0 8px 0;
      color: #666;
    }

    .product-section {
      margin-bottom: 24px;
    }

    .product-tiles {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 24px;
    }

    .product-selector, .product-details {
      border-radius: 8px;
      background-color: rgb(249, 250, 251);
      border: 1px solid rgb(229, 231, 235);
    }

    .product-select {
      width: 100%;
    }

    .product-info {
      margin: 16px 0;
      padding: 16px;
      background: white;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .info-item:last-child {
      margin-bottom: 0;
    }

    .info-item .label {
      font-weight: 500;
      color: #333;
      width: 140px;
    }

    .info-item .value {
      color: #666;
      flex: 1;
    }

    .info-icon {
      font-size: 18px;
      color: #666;
      margin-left: 8px;
      cursor: help;
    }

    .recommended-tag {
      margin-left: 8px;
      background: #4caf50;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
    }

    .helper-text {
      color: #666;
      font-size: 14px;
      margin: 8px 0 0 0;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .grid-item {
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
      border-radius: 12px;
      font-size: 14px;
    }

    .status-badge.active {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .action-toggles {
      display: flex;
      margin-bottom: 24px;
      padding: 0 24px;
    }

    .radio-group {
      display: flex;
      gap: 24px;
    }

    .services-section {
      margin-bottom: 24px;
    }

    .services-header {
      font-size: 24px;
      font-weight: 500;
      color: #333;
      margin-bottom: 24px;
    }

    .banner-message {
      background-color: #eff6ff;
      color: #1d4ed8;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-weight: 500;
      border: 1px solid #60a5fa;
      box-shadow: 0 2px 4px rgba(96, 165, 250, 0.1);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .services-card {
      border-radius: 10px;
    }

    .services-card h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 500;
      color: #333;
    }

    .selection-note {
      color: #666;
      font-size: 14px;
      margin: 0 0 24px 0;
    }

    .services-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      border: 1px solid #eee;
    }

    .services-table th,
    .services-table td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
      text-align: left;
    }

    .services-table th {
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }

    .services-table th:first-child,
    .services-table td:first-child {
      border-left: 1px solid #eee;
    }

    .services-table th:last-child,
    .services-table td:last-child {
      border-right: 1px solid #eee;
    }

    .benefit-name {
      font-weight: 500;
      color: #333;
    }

    .benefit-note {
      display: block;
      font-size: 12px;
      color: #666;
      font-weight: normal;
      margin-top: 4px;
    }

    .benefit-group-start td {
      border-top: 1px solid #eee;
    }

    .disabled-row {
      background-color: #f9fafb;
    }

    .disabled-row td {
      opacity: 0.7;
    }

    .disabled-row .status-pill,
    .disabled-row .benefit-name,
    .disabled-row .benefit-note {
      opacity: 0.7;
    }

    .status-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-pill.available {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-pill.unavailable {
      background-color: #f5f5f5;
      color: #666;
    }

    .status-pill.next-available {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .continue-button {
      background-color: #002F81 !important;
      color: white !important;
    }

    .checkbox-container {
      position: relative;
      display: inline-block;
    }

    .checkbox-container.disabled {
      background-color: #f5f5f5;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    .disabled-x {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 20px;
      font-weight: bold;
      pointer-events: none;
    }

    .checkbox-container.disabled:hover .disabled-x {
      display: block;
    }

    ::ng-deep .mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true]) ~ .mdc-checkbox__background {
      border-color: #002F81 !important;
    }

    ::ng-deep .mat-mdc-checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background {
      border-color: #002F81 !important;
      background-color: #002F81 !important;
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
        gap: 16px;
      }

      .claim360-container {
        padding: 12px;
      }
    }
  `]
})
export class Member360Component implements OnInit {
  selectedProduct = 'product-a';
  selectedAction = 'claim';
  selectedDate = '04/24/2025';
  hasGlassesOrder = false;
  hasContactLensOrder = false;

  patientInfo = {
    name: 'Tony Perez',
    dob: '05/22/1964',
    address: '4002 Apple Street',
    city: 'Mequon',
    state: 'WI',
    zip: '53092'
  };

  providerInfo = {
    name: 'Fuzzy Gizmo',
    practice: "Fix'n Teeth Shop",
    address: '4002 Apple Street',
    city: 'Mequon',
    state: 'WI',
    zip: '53092'
  };

  products = [
    { id: 'product-a', name: 'Product A', recommended: true },
    { id: 'product-b', name: 'Product B', recommended: false },
    { id: 'product-c', name: 'Product C', recommended: false }
  ];

  productDetails = {
    classGroup: 'Bright Smiles',
    effectiveDates: '01/01/2025 - No Term',
    clientProductId: '100'
  };

  professionalBenefits: BenefitGroup[] = [
    {
      name: 'Core',
      categories: [
        { name: 'Exam', status: 'Available', selected: false, disabled: false, nextAvailable: '1/1/2026' },
        { name: 'Contact Lens Fit', status: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Pediatric',
      note: 'must be 13 or younger',
      categories: [
        { name: 'Exam', status: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Maternity',
      note: 'must be pregnant',
      categories: [
        { name: 'Exam', status: 'Unavailable', selected: false, disabled: false }
      ]
    }
  ];

  materialBenefits: BenefitGroup[] = [
    {
      name: 'Core',
      categories: [
        { name: 'Frame', status: 'Available', selected: false, disabled: false },
        { name: 'Lenses', status: 'Available', selected: false, disabled: false },
        { name: 'Contact Lenses', status: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Pediatric',
      note: 'must be 13 or younger',
      categories: [
        { name: 'Frame', status: 'Available', selected: false, disabled: false },
        { name: 'Lenses', status: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Maternity',
      note: 'must be pregnant',
      categories: [
        { name: 'Frame', status: 'Available', selected: false, disabled: false },
        { name: 'Lenses', status: 'Available', selected: false, disabled: false }
      ]
    }
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    const recommended = this.products.find(p => p.recommended);
    if (recommended) {
      this.selectedProduct = recommended.id;
    }
  }

  updateInformation() {
    this.router.navigate(['/']);
  }

  navigateToClaimEntry() {
    this.router.navigate(['/claim-entry']);
  }

  private enableAllMaterialBenefits() {
    this.materialBenefits.forEach(benefit => {
      benefit.categories.forEach(category => {
        category.disabled = false;
      });
    });
  }

  onProfessionalServiceSelect(benefitName: string, selectedCategory: ServiceCategory) {
    if (!selectedCategory.selected) {
      this.professionalBenefits.forEach(benefit => {
        benefit.categories.forEach(category => {
          if (category.name === selectedCategory.name) {
            category.disabled = false;
          }
        });
      });
      return;
    }

    this.professionalBenefits.forEach(benefit => {
      benefit.categories.forEach(category => {
        if (category.name === selectedCategory.name && category !== selectedCategory) {
          category.disabled = true;
          category.selected = false;
        }
      });
    });
  }

  onMaterialServiceSelect(benefitName: string, selectedCategory: ServiceCategory) {
    if (!selectedCategory.selected) {
      const otherSelectionsInBenefit = this.materialBenefits
        .find(b => b.name === benefitName)
        ?.categories.some(c => c !== selectedCategory && c.selected);

      if (!otherSelectionsInBenefit) {
        this.enableAllMaterialBenefits();
      }

      this.updateBannerStates();
      return;
    }

    this.materialBenefits.forEach(benefit => {
      if (benefit.name !== benefitName) {
        benefit.categories.forEach(category => {
          category.disabled = true;
          category.selected = false;
        });
      }
    });

    this.updateBannerStates();
  }

  private updateBannerStates() {
    this.hasGlassesOrder = this.materialBenefits.some(benefit =>
      benefit.categories.some(category =>
        (category.name === 'Frame' || category.name === 'Lenses') && category.selected
      )
    );

    this.hasContactLensOrder = this.materialBenefits.some(benefit =>
      benefit.categories.some(category =>
        category.name === 'Contact Lenses' && category.selected
      )
    );
  }
}