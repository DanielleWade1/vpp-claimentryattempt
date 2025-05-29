import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface EntryItem {
  dos: string;
  type: string;
  visionBenefit: string;
  services: string[];
  materials: string[];
  windowCloses: string;
}

@Component({
  selector: 'app-entries-review-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2>Entries to Review</h2>
        <button mat-icon-button class="close-button" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="modal-description">
        The entries listed below are either incomplete or submitted. Incomplete entries were started but not submitted and will expire when the window closes. Submitted entries are in the review period and can be edited until the window closes. Click "Create New Entry" to proceed to the Member 360 where you will be able to enter something new. Please note, you will not be able to enter a claim or an order for a benefit that currently has an incomplete or submitted entry.
      </div>

      <button mat-raised-button color="primary" class="create-entry-button" (click)="close()">
        Create New Entry
      </button>

      <div class="entries-section">
        <h3>All Entries ({{allEntries.length}})</h3>
        <table class="entries-table">
          <thead>
            <tr>
              <th>DOS</th>
              <th>Type</th>
              <th>Vision Benefit</th>
              <th>Services/Materials</th>
              <th>Window Closes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let entry of allEntries">
              <td>{{entry.dos}}</td>
              <td>{{entry.type}}</td>
              <td>{{entry.visionBenefit}}</td>
              <td>Core: Exam, Core: Contact Lenses</td>
              <td>{{entry.windowCloses}}</td>
              <td>
                <div class="action-buttons">
                  <button 
                    mat-raised-button 
                    color="primary" 
                    (click)="close()">
                    {{entry.type.includes('Submitted') ? 'Edit' : 'Resume'}}
                  </button>
                  <button mat-raised-button color="warn" (click)="close()">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .modal-container {
      padding: 24px;
      max-width: 1200px;
      max-height: 80vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
      color: #333;
    }

    .close-button {
      color: #666;
    }

    .modal-description {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .create-entry-button {
      margin-bottom: 24px;
      background-color: #002F81 !important;
      color: white !important;
    }

    .entries-section {
      margin-bottom: 32px;
    }

    .entries-section h3 {
      font-size: 18px;
      font-weight: 500;
      color: #333;
      margin: 0 0 16px 0;
    }

    .entries-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }

    .entries-table th,
    .entries-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    .entries-table th {
      font-weight: 500;
      color: #666;
      font-size: 14px;
      white-space: nowrap;
    }

    .entries-table td {
      color: #333;
      font-size: 14px;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .action-buttons button {
      min-width: 80px;
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #666;
    }
  `]
})
export class EntriesReviewModalComponent {
  allEntries: EntryItem[] = [
    {
      dos: '10/20/2025',
      type: 'Claim - Submitted',
      visionBenefit: 'Product A',
      services: ['Core: Exam'],
      materials: ['Core: Contact Lenses'],
      windowCloses: '80:15 Minutes'
    },
    {
      dos: '10/21/2025',
      type: 'Auth - Submitted',
      visionBenefit: 'Product B',
      services: ['Core: Exam'],
      materials: ['Core: Contact Lenses'],
      windowCloses: '00:02 Minutes'
    },
    {
      dos: '10/20/2025',
      type: 'Claim - Incomplete',
      visionBenefit: 'Product A',
      services: ['Core: Exam'],
      materials: ['Core: Contact Lenses'],
      windowCloses: '20 Days'
    },
    {
      dos: '10/21/2025',
      type: 'Auth - Incomplete',
      visionBenefit: 'Product B',
      services: ['Core: Exam'],
      materials: ['Core: Contact Lenses'],
      windowCloses: '00:02 Minutes'
    }
  ];

  constructor(
    private dialogRef: MatDialogRef<EntriesReviewModalComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}