import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ServiceCategory, BenefitGroup } from '../../../types';
import { ProfessionalServicesComponent } from './professional-services.component';
import { MaterialServicesComponent } from './material-services.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ProfessionalServicesComponent,
    MaterialServicesComponent
  ],
  template: `
    <div class="services-section">
      <h2 class="services-header">{{selectedAction === 'claim' ? 'Claim Entry Services' : 'Authorization Entry Services'}}</h2>
      
      <div *ngIf="hasGlassesOrder" class="banner-message">
        Glasses Order Generated
      </div>
      <div *ngIf="hasContactLensOrder" class="banner-message">
        Contact Lenses Order Generated
      </div>

      <div class="services-grid">
        <app-professional-services
          [benefits]="professionalBenefits"
          (serviceSelect)="onProfessionalServiceSelect($event)">
        </app-professional-services>

        <app-material-services
          [benefits]="materialBenefits"
          (serviceSelect)="onMaterialServiceSelect($event)">
        </app-material-services>
      </div>
    </div>
  `,
  styles: [`
    .services-section {
      margin-bottom: 24px;
    }

    .services-header {
      font-size: 24px;
      font-weight: 500;
      color: #333;
      margin-bottom: 24px;
    }

    .banner-message {
      background-color: #eff6ff;
      color: #1d4ed8;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-weight: 500;
      border: 1px solid #60a5fa;
      box-shadow: 0 2px 4px rgba(96, 165, 250, 0.1);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    @media (max-width: 1024px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent {
  @Input() selectedAction = '';
  @Input() professionalBenefits: BenefitGroup[] = [];
  @Input() materialBenefits: BenefitGroup[] = [];
  @Input() hasGlassesOrder = false;
  @Input() hasContactLensOrder = false;
  @Output() professionalSelect = new EventEmitter<{benefitName: string, category: ServiceCategory}>();
  @Output() materialSelect = new EventEmitter<{benefitName: string, category: ServiceCategory}>();

  onProfessionalServiceSelect(event: {benefitName: string, category: ServiceCategory}) {
    this.professionalSelect.emit(event);
  }

  onMaterialServiceSelect(event: {benefitName: string, category: ServiceCategory}) {
    this.materialSelect.emit(event);
  }
}