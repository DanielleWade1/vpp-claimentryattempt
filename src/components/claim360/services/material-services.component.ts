import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ServiceCategory, BenefitGroup } from '../../../types';

@Component({
  selector: 'app-material-services',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, FormsModule],
  template: `
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
            <ng-container *ngFor="let benefit of benefits">
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
                      (change)="onServiceSelect(benefit.name, category)">
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
  `,
  styles: [`
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
      background-color: #166534;
      color: white;
    }

    .status-pill.unavailable {
      background-color: #991B1B;
      color: white;
    }

    .status-pill.next-available {
      background-color: #1E40AF;
      color: white;
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
  `]
})
export class MaterialServicesComponent {
  @Input() benefits: BenefitGroup[] = [];
  @Output() serviceSelect = new EventEmitter<{benefitName: string, category: ServiceCategory}>();

  onServiceSelect(benefitName: string, category: ServiceCategory) {
    this.serviceSelect.emit({ benefitName, category });
  }
}