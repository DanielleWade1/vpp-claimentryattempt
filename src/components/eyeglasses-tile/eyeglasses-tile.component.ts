import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-eyeglasses-tile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card class="eyeglasses-card">
      <mat-card-header>
        <mat-card-title>Eyeglasses</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div class="patient-supplied-frame">
          <label class="section-label">Patient Supplied Frame:</label>
          <mat-radio-group [(ngModel)]="patientSuppliedFrame">
            <mat-radio-button value="yes">Yes</mat-radio-button>
            <mat-radio-button value="no">No</mat-radio-button>
          </mat-radio-group>
        </div>

        <div class="search-section">
          <h3 class="search-header">Search For a frame using any of the following criteria:</h3>
          <p class="search-subheader">Style, Collection, Manufacturer</p>

          <div class="search-container">
            <mat-form-field appearance="outline" class="search-input">
              <mat-label>Find Frame</mat-label>
              <input matInput [(ngModel)]="frameSearchQuery">
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="searchFrame()">
              Search
            </button>

            <a href="javascript:void(0)" class="cant-find-link" (click)="handleCantFind()">
              Can't find your Frame?
            </a>
          </div>
        </div>

        <div class="frame-banner" *ngIf="showBanner">
          Frame details are required in order to process the order.
        </div>

        <div class="lab-selection">
          <mat-form-field appearance="outline">
            <mat-label>Lab Selection</mat-label>
            <mat-select [(ngModel)]="selectedLab">
              <mat-option *ngFor="let lab of labs" [value]="lab.value">
                {{lab.name}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .eyeglasses-card {
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

    .patient-supplied-frame {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .section-label {
      font-weight: 500;
      color: #333;
      min-width: 150px;
    }

    mat-radio-group {
      display: flex;
      gap: 16px;
    }

    .search-section {
      margin-bottom: 24px;
    }

    .search-header {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin: 0 0 8px 0;
    }

    .search-subheader {
      color: #666;
      font-size: 14px;
      margin: 0 0 16px 0;
    }

    .search-container {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .search-input {
      flex: 1;
    }

    .cant-find-link {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
      margin-top: 12px;
      display: inline-block;
    }

    .cant-find-link:hover {
      text-decoration: underline;
    }

    .frame-banner {
      background-color: #fff3e0;
      color: #e65100;
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 24px;
      font-weight: 500;
    }

    .lab-selection {
      margin-top: 24px;
    }

    mat-form-field {
      width: 100%;
    }

    @media (max-width: 768px) {
      .patient-supplied-frame {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .search-container {
        flex-direction: column;
        gap: 12px;
      }

      .cant-find-link {
        margin-top: 0;
      }
    }
  `]
})
export class EyeglassesTileComponent {
  patientSuppliedFrame: 'yes' | 'no' = 'no';
  frameSearchQuery = '';
  selectedLab = '';
  showBanner = true;

  labs = [
    { value: 'lab1', name: 'Vision Lab 1' },
    { value: 'lab2', name: 'Vision Lab 2' },
    { value: 'lab3', name: 'Vision Lab 3' }
  ];

  searchFrame() {
    // Implement frame search logic
    console.log('Searching for frame:', this.frameSearchQuery);
  }

  handleCantFind() {
    // Implement can't find frame logic
    console.log('Cannot find frame clicked');
  }
}