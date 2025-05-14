import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface QuickAccessOption {
  id: string;
  label: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-quick-access',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatButtonModule, FormsModule],
  template: `
    <mat-card class="dashboard-card">
      <mat-card-content>
        <h2 class="card-title">Quick Access</h2>
        <p class="card-content">Pick a feature for quick access to common tasks</p>
        
        <div class="quick-access-container">
          <mat-form-field appearance="outline" class="feature-select">
            <mat-label>Select Feature</mat-label>
            <mat-select [(ngModel)]="selectedFeature" (selectionChange)="onFeatureChange()">
              <mat-option *ngFor="let option of quickAccessOptions" [value]="option.id">
                {{option.label}}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <p *ngIf="selectedOption" class="feature-description">
            {{selectedOption.description}}
          </p>

          <button 
            *ngIf="selectedOption"
            mat-raised-button 
            class="access-button"
            (click)="navigateToFeature()">
            Access {{selectedOption.label}}
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .quick-access-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
    }

    .feature-select {
      width: 100%;
    }

    .feature-description {
      color: #666;
      font-size: 14px;
      margin: 0;
    }

    .access-button {
      background-color: #002F81 !important;
      color: white !important;
      align-self: flex-start;
    }

    :host {
      display: block;
      height: 100%;
    }

    .dashboard-card {
      height: 100%;
    }

    mat-card-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class QuickAccessComponent implements OnInit {
  quickAccessOptions: QuickAccessOption[] = [
    {
      id: 'eligibility',
      label: 'Eligibility Check',
      route: '/eligibility',
      description: 'Quickly verify member eligibility and benefits'
    },
    {
      id: 'claims',
      label: 'Submit Claim',
      route: '/claims/new',
      description: 'Start a new claim submission'
    },
    {
      id: 'authorizations',
      label: 'Create Authorization',
      route: '/authorizations/new',
      description: 'Submit a new authorization request'
    },
    {
      id: 'orders',
      label: 'Place Order',
      route: '/orders/new',
      description: 'Create a new eyewear or contact lens order'
    }
  ];

  selectedFeature: string = '';
  selectedOption: QuickAccessOption | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Restore last selected feature from localStorage
    const savedFeature = localStorage.getItem('quickAccessFeature');
    if (savedFeature) {
      this.selectedFeature = savedFeature;
      this.selectedOption = this.quickAccessOptions.find(opt => opt.id === savedFeature) || null;
    }
  }

  onFeatureChange() {
    this.selectedOption = this.quickAccessOptions.find(opt => opt.id === this.selectedFeature) || null;
    // Save selection to localStorage
    if (this.selectedFeature) {
      localStorage.setItem('quickAccessFeature', this.selectedFeature);
    }
  }

  navigateToFeature() {
    if (this.selectedOption) {
      this.router.navigate([this.selectedOption.route]);
    }
  }
}