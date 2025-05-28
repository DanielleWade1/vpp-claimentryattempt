import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EyeglassesInfoModalComponent } from '../../eyeglasses-info-modal/eyeglasses-info-modal.component';
import { ContactLensesInfoModalComponent } from '../../contact-lenses-info-modal/contact-lenses-info-modal.component';
import { EntryRestrictionsModalComponent } from '../../entry-restrictions-modal/entry-restrictions-modal.component';

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule
  ],
  template: `
    <div class="product-tiles">
      <mat-card class="product-selector">
        <mat-card-content>
          <h3>Select Product</h3>
          <mat-form-field appearance="outline" class="product-select">
            <mat-select [(value)]="selectedProduct" (valueChange)="onProductChange($event)">
              <mat-option *ngFor="let product of products" [value]="product.id">
                {{product.name}}
                <span *ngIf="product.recommended" class="recommended-tag">Recommended</span>
              </mat-option>
            </mat-select>
          </mat-form-field>
          <div class="product-info">
            <div class="info-item">
              <span class="label">Eyeglasses:</span>
              <span class="value clickable" (click)="openEyeglassesInfoModal()">Provider Claim and Order</span>
              <mat-icon class="info-icon clickable" (click)="openEyeglassesInfoModal()">info</mat-icon>
            </div>
            <div class="info-item">
              <span class="label">Contact Lenses:</span>
              <span class="value clickable" (click)="openContactLensesInfoModal()">Provider Claim Only</span>
              <mat-icon class="info-icon clickable" (click)="openContactLensesInfoModal()">info</mat-icon>
            </div>
            <div class="info-item">
              <span class="label">Entry Restrictions:</span>
              <span class="value clickable" (click)="openEntryRestrictionsModal()">None</span>
              <mat-icon class="info-icon clickable" (click)="openEntryRestrictionsModal()">info</mat-icon>
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
  `,
  styles: [`
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

    .info-item .value.clickable,
    .info-item .info-icon.clickable {
      cursor: pointer;
    }

    .info-item .value.clickable:hover {
      color: #002F81;
    }

    .info-icon {
      font-size: 18px;
      color: #666;
      margin-left: 8px;
    }

    .info-icon.clickable:hover {
      color: #002F81;
    }

    .recommended-tag {
      margin-left: 8px;
      background: #d4edda;
      color: #155724;
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
      background-color: #d4edda;
      color: #155724;
    }

    @media (max-width: 1024px) {
      .product-tiles {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductSelectionComponent {
  @Input() products: any[] = [];
  @Input() selectedProduct: string = '';
  @Input() selectedDate: string = '';
  @Input() productDetails: any;
  @Output() productChange = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  onProductChange(value: string) {
    this.productChange.emit(value);
  }

  openEyeglassesInfoModal(): void {
    this.dialog.open(EyeglassesInfoModalComponent, {
      width: '600px',
      maxHeight: '90vh'
    });
  }

  openContactLensesInfoModal(): void {
    this.dialog.open(ContactLensesInfoModalComponent, {
      width: '600px',
      maxHeight: '90vh'
    });
  }

  openEntryRestrictionsModal(): void {
    this.dialog.open(EntryRestrictionsModalComponent, {
      width: '600px',
      maxHeight: '90vh'
    });
  }
}