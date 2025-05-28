import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-entry-restrictions-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2>Entry Restrictions</h2>
        <button mat-icon-button class="close-button" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="modal-content">
        <p>For the selected provider and location, an entry restriction will limit what services and materials can be entered to prevent mistakes. If an entry restriction has not been applied you will be able to enter anything that is available for the selected member. A description of each entry restriction is listed below.</p>
        <ul>
          <li>Exam and Contacts: Entry is restricted to comprehensive eye exams and contact lenses. All other coverage categories cannot be entered.</li>
          <li>Exams Only: Entry is restricted to comprehensive eye exams only. All other coverage categories cannot be entered.</li>
          <li>Full Service: Entry is not restricted, all available services and materials can be entered. This is the same as having no restrictions.</li>
          <li>Materials Only: Entry is restricted to frames, lenses, and contact lenses. No professional services can be entered.</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .modal-container {
      padding: 24px;
      max-width: 600px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .modal-header h2 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
      color: #333;
    }

    .close-button {
      color: #666;
    }

    .modal-content {
      color: #333;
    }

    .modal-content p {
      margin: 0 0 16px 0;
      line-height: 1.5;
    }

    .modal-content ul {
      margin: 0;
      padding-left: 20px;
    }

    .modal-content li {
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .modal-content li:last-child {
      margin-bottom: 0;
    }
  `]
})
export class EntryRestrictionsModalComponent {
  constructor(public dialogRef: MatDialogRef<EntryRestrictionsModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}