import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Claim360HeaderComponent } from './components/claim360/header/header.component';
import { InfoCardsComponent } from './components/claim360/info-cards/info-cards.component';
import { ProductSelectionComponent } from './components/claim360/product-selection/product-selection.component';
import { ActionSelectorComponent } from './action-selector.component';
import { ServicesComponent } from './components/claim360/services/services.component';
import { ServiceCategory, BenefitGroup } from './types';
import { EntriesReviewModalComponent } from './components/entries-review-modal/entries-review-modal.component';

@Component({
  selector: 'app-claim360',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    Claim360HeaderComponent,
    InfoCardsComponent,
    ProductSelectionComponent,
    ActionSelectorComponent,
    ServicesComponent
  ],
  template: `
    <div class="app-container">
      <app-claim360-header></app-claim360-header>

      <div class="claim360-container">
        <mat-stepper [selectedIndex]="0" class="claim-stepper">
          <mat-step label="Claim 360" state="claim360" completed="true">
          </mat-step>
          <mat-step label="Claim Entry" state="entry">
          </mat-step>
          <mat-step label="Review" state="review">
          </mat-step>
        </mat-stepper>

        <h1 class="page-title">Claim 360</h1>

        <div class="draft-entries-banner">
          <span>Other entries in progress, some products will not be configurable, view drafts to access those.</span>
          <button mat-button class="banner-button" (click)="openEntriesReviewModal()">View Draft Entries</button>
        </div>
        
        <div class="content-section">
          <app-info-cards
            [patientInfo]="patientInfo"
            [providerInfo]="providerInfo">
          </app-info-cards>

          <app-product-selection
            [products]="products"
            [selectedProduct]="selectedProduct"
            [selectedDate]="selectedDate"
            [productDetails]="productDetails"
            (productChange)="onProductChange($event)">
          </app-product-selection>

          <app-action-selector
            (actionChange)="selectedAction = $event">
          </app-action-selector>
        </div>

        <app-services
          [selectedAction]="selectedAction"
          [professionalBenefits]="professionalBenefits"
          [materialBenefits]="materialBenefits"
          [hasGlassesOrder]="hasGlassesOrder"
          [hasContactLensOrder]="hasContactLensOrder"
          (professionalSelect)="onProfessionalServiceSelect($event.benefitName, $event.category)"
          (materialSelect)="onMaterialServiceSelect($event.benefitName, $event.category)">
        </app-services>

        <div class="stepper-buttons">
          <button mat-raised-button color="primary" class="continue-button" (click)="navigateToClaimEntry()">
            Continue
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./claim360.component.css']
})
export class Claim360Component implements OnInit {
  selectedProduct = 'product-a';
  private _selectedAction = 'claim';
  selectedDate = '04/24/2025';
  hasGlassesOrder = false;
  hasContactLensOrder = false;

  get selectedAction(): string {
    return this._selectedAction;
  }

  set selectedAction(value: string) {
    this._selectedAction = value;
    this.applyActionSpecificStatuses();
  }

  patientInfo = {
    name: 'Tony Perez',
    dob: '05/22/1964',
    address: '4002 Apple Street',
    city: 'Mequon',
    state: 'WI',
    zip: '53092'
  };

  providerInfo = {
    name: 'Fuzzy Gizmo',
    practice: "Fix'n Teeth Shop",
    address: '4002 Apple Street',
    city: 'Mequon',
    state: 'WI',
    zip: '53092'
  };

  products = [
    { id: 'product-a', name: 'Product A', recommended: true },
    { id: 'product-b', name: 'Product B', recommended: false },
    { id: 'product-c', name: 'Product C', recommended: false }
  ];

  productDetails = {
    classGroup: 'Bright Smiles',
    effectiveDates: '01/01/2025 - No Term',
    clientProductId: '100'
  };

  professionalBenefits: BenefitGroup[] = [
    {
      name: 'Core',
      categories: [
        { name: 'Exam', status: 'Available', originalStatus: 'Available', selected: false, disabled: false, nextAvailable: '1/1/2026' },
        { name: 'Contact Lens Fit', status: 'Available', originalStatus: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Pediatric',
      note: 'must be 13 or younger',
      categories: [
        { name: 'Exam', status: 'Available', originalStatus: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Maternity',
      note: 'must be pregnant',
      categories: [
        { name: 'Exam', status: 'Unavailable', originalStatus: 'Unavailable', selected: false, disabled: false }
      ]
    }
  ];

  materialBenefits: BenefitGroup[] = [
    {
      name: 'Core',
      categories: [
        { name: 'Frame', status: 'Available', originalStatus: 'Available', selected: false, disabled: false },
        { name: 'Lenses', status: 'Available', originalStatus: 'Available', selected: false, disabled: false },
        { name: 'Contact Lenses', status: 'Available', originalStatus: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Pediatric',
      note: 'must be 13 or younger',
      categories: [
        { name: 'Frame', status: 'Available', originalStatus: 'Available', selected: false, disabled: false },
        { name: 'Lenses', status: 'Available', originalStatus: 'Available', selected: false, disabled: false }
      ]
    },
    {
      name: 'Maternity',
      note: 'must be pregnant',
      categories: [
        { name: 'Frame', status: 'Available', originalStatus: 'Available', selected: false, disabled: false },
        { name: 'Lenses', status: 'Available', originalStatus: 'Available', selected: false, disabled: false }
      ]
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const recommended = this.products.find(p => p.recommended);
    if (recommended) {
      this.selectedProduct = recommended.id;
    }
    this.applyActionSpecificStatuses();
  }

  private applyActionSpecificStatuses() {
    const updateBenefitStatuses = (benefits: BenefitGroup[]) => {
      benefits.forEach(benefit => {
        benefit.categories.forEach(category => {
          if (this._selectedAction === 'auth') {
            if (category.disabled) {
              category.status = 'Auth Not Required';
            } else if (category.originalStatus === 'Available') {
              category.status = 'Auth Entry Available';
            } else {
              category.status = 'Auth Not Required';
            }
          } else {
            category.status = category.originalStatus || 'Available';
          }
        });
      });
    };

    updateBenefitStatuses(this.professionalBenefits);
    updateBenefitStatuses(this.materialBenefits);
  }

  openEntriesReviewModal(): void {
    this.dialog.open(EntriesReviewModalComponent, {
      width: '90%',
      maxWidth: '1200px',
      maxHeight: '90vh',
      disableClose: true
    });
  }

  onProductChange(productId: string) {
    this.selectedProduct = productId;
  }

  navigateToClaimEntry() {
    this.router.navigate(['/claim-entry']);
  }

  onProfessionalServiceSelect(benefitName: string, selectedCategory: ServiceCategory) {
    if (!selectedCategory.selected) {
      this.professionalBenefits.forEach(benefit => {
        benefit.categories.forEach(category => {
          if (category.name === selectedCategory.name) {
            category.disabled = false;
          }
        });
      });
      this.applyActionSpecificStatuses();
      return;
    }

    this.professionalBenefits.forEach(benefit => {
      benefit.categories.forEach(category => {
        if (category.name === selectedCategory.name && category !== selectedCategory) {
          category.disabled = true;
          category.selected = false;
        }
      });
    });
    this.applyActionSpecificStatuses();
  }

  onMaterialServiceSelect(benefitName: string, selectedCategory: ServiceCategory) {
    if (!selectedCategory.selected) {
      const otherSelectionsInBenefit = this.materialBenefits
        .find(b => b.name === benefitName)
        ?.categories.some(c => c !== selectedCategory && c.selected);

      if (!otherSelectionsInBenefit) {
        this.enableAllMaterialBenefits();
      }

      this.updateBannerStates();
      this.applyActionSpecificStatuses();
      return;
    }

    this.materialBenefits.forEach(benefit => {
      if (benefit.name !== benefitName) {
        benefit.categories.forEach(category => {
          category.disabled = true;
          category.selected = false;
        });
      }
    });

    this.updateBannerStates();
    this.applyActionSpecificStatuses();
  }

  private enableAllMaterialBenefits() {
    this.materialBenefits.forEach(benefit => {
      benefit.categories.forEach(category => {
        category.disabled = false;
      });
    });
  }

  private updateBannerStates() {
    this.hasGlassesOrder = this.materialBenefits.some(benefit =>
      benefit.categories.some(category =>
        (category.name === 'Frame' || category.name === 'Lenses') && category.selected
      )
    );

    this.hasContactLensOrder = this.materialBenefits.some(benefit =>
      benefit.categories.some(category =>
        category.name === 'Contact Lenses' && category.selected
      )
    );
  }
}