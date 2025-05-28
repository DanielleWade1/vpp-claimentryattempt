import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DiagnosisPointersModalComponent } from '../diagnosis-pointers-modal/diagnosis-pointers-modal.component';

interface FrameSearchResult {
  manufacturer: string;
  collection: string;
  style: string;
}

@Component({
  selector: 'app-eyeglasses-tile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  template: `
    <mat-card class="eyeglasses-card">
      <mat-card-header>
        <mat-card-title>Eyeglasses</mat-card-title>
        <div class="header-actions">
          <button mat-raised-button color="primary" (click)="addDiagnosisCodes()">
            Add Diagnosis Codes
          </button>
        </div>
      </mat-card-header>

      <mat-card-content>
        <div class="patient-supplied-frame">
          <label class="section-label">Patient Supplied Frame:</label>
          <mat-radio-group [(ngModel)]="patientSuppliedFrame">
            <mat-radio-button value="yes">Yes</mat-radio-button>
            <mat-radio-button value="no">No</mat-radio-button>
          </mat-radio-group>
        </div>

        <div class="search-section" *ngIf="!showSearchResults && !showConfiguration">
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

        <div *ngIf="showSearchResults" class="search-results">
          <table class="search-results-table">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Collection</th>
                <th>Style</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let frame of searchResults">
                <td>{{frame.manufacturer}}</td>
                <td>{{frame.collection}}</td>
                <td>{{frame.style}}</td>
                <td>
                  <button mat-raised-button color="primary" (click)="selectFrame(frame)">
                    Select
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="showConfiguration" class="configuration-section">
          <div class="frame-details">
            <table class="frame-details-table">
              <tr>
                <th>Manufacturer</th>
                <th>Collection</th>
                <th>Style</th>
                <th>Size</th>
                <th>Color (Color Code)</th>
                <th>Frame Edge Type</th>
                <th>Billed Charged</th>
              </tr>
              <tr>
                <td>{{selectedFrame?.manufacturer}}</td>
                <td>{{selectedFrame?.collection}}</td>
                <td>{{selectedFrame?.style}}</td>
                <td>
                  <mat-form-field appearance="outline">
                    <mat-select [(ngModel)]="selectedSize" (selectionChange)="onSizeChange()">
                      <mat-option *ngFor="let size of sizes" [value]="size">{{size}}</mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
                <td>
                  <mat-form-field appearance="outline">
                    <mat-select [(ngModel)]="selectedColor">
                      <mat-option *ngFor="let color of colors" [value]="color">{{color}}</mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
                <td>Hide-a-bevel</td>
                <td>
                  <mat-form-field appearance="outline">
                    <span matPrefix>$&nbsp;</span>
                    <input matInput type="number" [(ngModel)]="billedCharged">
                  </mat-form-field>
                </td>
              </tr>
            </table>
          </div>

          <div class="drill-mount-section" [formGroup]="drillMountForm">
            <h3>Drill Mount Information</h3>
            <div class="drill-mount-grid">
              <div class="drill-mount-row">
                <mat-form-field appearance="outline">
                  <mat-label>Manufacturer Name</mat-label>
                  <input matInput formControlName="manufacturerName">
                </mat-form-field>
                <mat-form-field appearance="outline" class="small-input">
                  <mat-label>A</mat-label>
                  <input matInput formControlName="a">
                </mat-form-field>
              </div>
              <div class="drill-mount-row">
                <mat-form-field appearance="outline">
                  <mat-label>Collection Name</mat-label>
                  <input matInput formControlName="collectionName">
                </mat-form-field>
                <mat-form-field appearance="outline" class="small-input">
                  <mat-label>B</mat-label>
                  <input matInput formControlName="b">
                </mat-form-field>
              </div>
              <div class="drill-mount-row">
                <mat-form-field appearance="outline">
                  <mat-label>Shape</mat-label>
                  <input matInput formControlName="shape">
                </mat-form-field>
              </div>
            </div>
          </div>
        </div>

        <div class="frame-banner" *ngIf="showFrameDetailsRequired">
          Frame details are required in order to process the order.
        </div>

        <div class="frame-banner" *ngIf="showDrillMountRequired">
          Drill mount information required for this size.
        </div>

        <div class="frame-banner" *ngIf="showSafetyFrame">
          You have selected a Z87 safety frame. Lenses ordered with this frame will meet minimum safety thickness standards.
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

    .search-results {
      margin: 24px 0;
    }

    .search-results-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .search-results-table th,
    .search-results-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .search-results-table th {
      background: #f5f5f5;
      font-weight: 500;
      color: #333;
    }

    .frame-details {
      margin-bottom: 24px;
    }

    .frame-details-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .frame-details-table th,
    .frame-details-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .frame-details-table th {
      background: #f5f5f5;
      font-weight: 500;
      color: #333;
    }

    .drill-mount-section {
      background: #f9fafb;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .drill-mount-section h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .drill-mount-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .drill-mount-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }

    .drill-mount-row .mat-form-field {
      flex: 1;
    }

    .drill-mount-row .small-input {
      width: 100px;
      flex: 0 0 auto;
    }

    .frame-banner {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 12px 16px;
      border-radius: 4px;
      margin-bottom: 16px;
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

      .drill-mount-row {
        flex-direction: column;
      }

      .drill-mount-row .small-input {
        width: 100%;
      }
    }
  `]
})
export class EyeglassesTileComponent {
  patientSuppliedFrame: 'yes' | 'no' = 'no';
  frameSearchQuery = '';
  selectedLab = '';
  showFrameDetailsRequired = true;
  showDrillMountRequired = false;
  showSafetyFrame = false;
  showSearchResults = false;
  showConfiguration = false;

  selectedFrame: FrameSearchResult | null = null;
  selectedSize = '';
  selectedColor = '';
  billedCharged: number | null = null;

  searchResults: FrameSearchResult[] = [];
  diagnosisPointers: string[] = new Array(8).fill('');

  drillMountForm: FormGroup;

  labs = [
    { value: 'lab1', name: 'Vision Lab 1' },
    { value: 'lab2', name: 'Vision Lab 2' },
    { value: 'lab3', name: 'Vision Lab 3' }
  ];

  sizes = ['Small', 'Medium', 'Large'];
  colors = ['Black', 'Brown', 'Silver', 'Gold'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.drillMountForm = this.fb.group({
      manufacturerName: [''],
      collectionName: [''],
      shape: [''],
      a: [''],
      b: ['']
    });
  }

  searchFrame() {
    this.searchResults = [
      { manufacturer: 'Coach', collection: 'Fancy Collection', style: 'C7000' },
      { manufacturer: 'Burberry', collection: 'Everyday Collection', style: 'B789' }
    ];
    this.showSearchResults = true;
    this.showConfiguration = false;
  }

  selectFrame(frame: FrameSearchResult) {
    this.selectedFrame = frame;
    this.showSearchResults = false;
    this.showConfiguration = true;
    this.showSafetyFrame = frame.manufacturer === 'Coach';
    
    this.drillMountForm.patchValue({
      manufacturerName: frame.manufacturer,
      collectionName: frame.collection
    });
  }

  onSizeChange() {
    this.showDrillMountRequired = this.selectedSize === 'Small';
  }

  handleCantFind() {
    console.log('Cannot find frame clicked');
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
}