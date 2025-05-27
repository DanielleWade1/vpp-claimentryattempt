import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-lenses-info-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2>Contact Lenses Transaction Type</h2>
        <button mat-icon-button class="close-button" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="modal-content">
        <p>For the selected product, the contact lenses transaction type defines what will be created on behalf of the provider when contact lenses are entered in the provider portal. A description of each transaction type is listed below.</p>
        <ul>
          <li>Provider Claim Only: The information entered by the provider is used to create a medical professional claim for materials that is payable to the provider.</li>
          <li>Provider Claim and Order (Formulary Only): The information entered by the provider is used to create a medical professional claim for materials that is payable to the provider; it is also used to determine if the selected contact lenses are part of a formulary and if they are an order for contact lenses will be generated. Please note, if an order will be generated for the selected contact lenses it will be clearly indicated on the review screen prior to submission.</li>
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
export class ContactLensesInfoModalComponent {
  constructor(public dialogRef: MatDialogRef<ContactLensesInfoModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}