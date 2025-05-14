import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="section-header">
      <h2>Selected Information</h2>
      <button class="update-link" (click)="onUpdate()">Update Selected Information</button>
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
  `,
  styles: [`
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

    @media (max-width: 1024px) {
      .info-tiles {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class InfoCardsComponent {
  @Input() patientInfo: any;
  @Input() providerInfo: any;

  onUpdate() {
    // Emit event to parent
  }
}