import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SystemAlert } from './types';

@Component({
  selector: 'app-alert-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content>
      <div class="alert-details">
        <section>
          <h3>Maintenance Window</h3>
          <p>{{data.details.maintenanceWindow}}</p>
        </section>

        <section>
          <h3>Affected Systems</h3>
          <ul>
            <li *ngFor="let system of data.details.affectedSystems">{{system}}</li>
          </ul>
        </section>

        <section>
          <h3>Expected Improvements</h3>
          <ul>
            <li *ngFor="let improvement of data.details.improvements">{{improvement}}</li>
          </ul>
        </section>

        <section *ngIf="data.details.userActions.length > 0">
          <h3>Required Actions</h3>
          <ul>
            <li *ngFor="let action of data.details.userActions">{{action}}</li>
          </ul>
        </section>

        <section class="support-info">
          <h3>Support Contact</h3>
          <p>Email: {{data.details.supportContact.email}}</p>
          <p>Phone: {{data.details.supportContact.phone}}</p>
          <p>Hours: {{data.details.supportContact.hours}}</p>
        </section>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .alert-details {
      padding: 16px 0;
    }

    section {
      margin-bottom: 24px;
    }

    h3 {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
      color: #333;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 8px;
      color: #666;
    }

    .support-info {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      margin-top: 24px;
    }

    .support-info p {
      margin: 8px 0;
      color: #666;
    }
  `]
})
export class AlertDetailsDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SystemAlert,
    private dialogRef: MatDialogRef<AlertDetailsDialog>
  ) {}

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-system-alert',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="alert-item" [class.unread]="!alert.viewed">
      <div class="alert-content">
        <h3>{{alert.title}}</h3>
        <p class="alert-status">{{alert.status}}</p>
      </div>
      <button mat-button color="primary" (click)="viewDetails()">View Details</button>
    </div>
  `,
  styles: [`
    .alert-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      border: 1px solid #eee;
      margin-bottom: 8px;
    }

    .alert-item.unread {
      background: #f8f9fa;
      border-left: 4px solid #002F81;
    }

    .alert-content {
      flex: 1;
    }

    .alert-content h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .alert-status {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class SystemAlertComponent {
  alert: SystemAlert = {
    id: 'upgrade-2025',
    title: 'System Upgrade Scheduled',
    date: new Date(2025, 3, 20, 10, 0), // April 20, 2025 10:00 AM
    viewed: false,
    status: 'April 20, 2025 10:00 AM EST',
    type: 'IMPORTANT',
    details: {
      maintenanceWindow: '4 hours (10:00 AM - 2:00 PM EST)',
      affectedSystems: [
        'Provider Portal',
        'Claims Processing System',
        'Authorization System',
        'Payment Processing'
      ],
      improvements: [
        'Enhanced system performance and reliability',
        'New features for claims processing',
        'Improved authorization workflow',
        'Updated security protocols'
      ],
      userActions: [
        'Complete all pending transactions before maintenance window',
        'Save any work in progress',
        'Log out of the system by 9:45 AM EST'
      ],
      supportContact: {
        email: 'support@example.com',
        phone: '1-800-555-0123',
        hours: '24/7 Emergency Support'
      }
    }
  };

  constructor(private dialog: MatDialog) {}

  viewDetails() {
    this.dialog.open(AlertDetailsDialog, {
      data: this.alert,
      width: '600px',
      maxHeight: '80vh'
    });
    this.alert.viewed = true;
  }
}