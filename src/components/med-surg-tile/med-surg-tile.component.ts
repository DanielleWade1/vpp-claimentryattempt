import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

interface ProcedureSubTile {
  id: string;
  procedureCode: string;
  billedAmount: number | null;
  quantity: number | null;
  modifiers: {
    modifier1: string;
    modifier2: string;
    modifier3: string;
    modifier4: string;
  };
  diagnosisPointers: {
    ptr1: string;
    ptr2: string;
    ptr3: string;
    ptr4: string;
    ptr5: string;
    ptr6: string;
    ptr7: string;
    ptr8: string;
  };
}

@Component({
  selector: 'app-med-surg-tile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card class="med-surg-card">
      <mat-card-header>
        <mat-card-title>Med/Surg</mat-card-title>
      </mat-card-header>

      <mat-card-content [formGroup]="medSurgForm">
        <div formArrayName="procedures">
          <div *ngFor="let procedure of procedures.controls; let i = index" [formGroupName]="i" class="procedure-subtile">
            <div class="subtile-header">
              <h3>Procedure {{i + 1}}</h3>
              <div class="header-actions">
                <button mat-button color="primary" (click)="clearService(i)">Clear Service</button>
                <button mat-button color="warn" (click)="removeService(i)" *ngIf="i > 0">Remove Service</button>
              </div>
            </div>

            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Procedure Code</mat-label>
                <mat-select formControlName="procedureCode">
                  <mat-option value="code1">Code 1</mat-option>
                  <mat-option value="code2">Code 2</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Billed Amount</mat-label>
                <input matInput type="number" formControlName="billedAmount">
                <span matPrefix>$&nbsp;</span>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Qty</mat-label>
                <input matInput type="number" formControlName="quantity">
              </mat-form-field>
            </div>

            <div class="row modifiers" formGroupName="modifiers">
              <mat-form-field appearance="outline">
                <mat-label>Modifier 1</mat-label>
                <input matInput formControlName="modifier1">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Modifier 2</mat-label>
                <input matInput formControlName="modifier2">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Modifier 3</mat-label>
                <input matInput formControlName="modifier3">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Modifier 4</mat-label>
                <input matInput formControlName="modifier4">
              </mat-form-field>
            </div>

            <div formGroupName="diagnosisPointers">
              <div class="row diagnosis-pointers">
                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 1</mat-label>
                  <input matInput formControlName="ptr1">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 2</mat-label>
                  <input matInput formControlName="ptr2">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 3</mat-label>
                  <input matInput formControlName="ptr3">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 4</mat-label>
                  <input matInput formControlName="ptr4">
                </mat-form-field>
              </div>

              <div class="row diagnosis-pointers">
                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 5</mat-label>
                  <input matInput formControlName="ptr5">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 6</mat-label>
                  <input matInput formControlName="ptr6">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 7</mat-label>
                  <input matInput formControlName="ptr7">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Diagnosis Ptr 8</mat-label>
                  <input matInput formControlName="ptr8">
                </mat-form-field>
              </div>
            </div>
          </div>
        </div>

        <button mat-button color="primary" (click)="addService()" class="add-service-button">
          Add Another Service
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .med-surg-card {
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

    .procedure-subtile {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .subtile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .subtile-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .header-actions {
      display: flex;
      gap: 16px;
    }

    .row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .row:last-child {
      margin-bottom: 0;
    }

    .modifiers {
      grid-template-columns: repeat(4, 1fr);
    }

    .diagnosis-pointers {
      grid-template-columns: repeat(4, 1fr);
    }

    mat-form-field {
      width: 100%;
    }

    .add-service-button {
      margin-top: 16px;
    }

    @media (max-width: 1200px) {
      .modifiers,
      .diagnosis-pointers {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .row {
        grid-template-columns: 1fr;
      }

      .modifiers,
      .diagnosis-pointers {
        grid-template-columns: 1fr;
      }

      .header-actions {
        flex-direction: column;
        gap: 8px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedSurgTileComponent {
  medSurgForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.medSurgForm = this.fb.group({
      procedures: this.fb.array([])
    });

    // Add initial procedure
    this.addService();
  }

  get procedures() {
    return this.medSurgForm.get('procedures') as FormArray;
  }

  createProcedureGroup(): FormGroup {
    return this.fb.group({
      procedureCode: [''],
      billedAmount: [null],
      quantity: [null],
      modifiers: this.fb.group({
        modifier1: [''],
        modifier2: [''],
        modifier3: [''],
        modifier4: ['']
      }),
      diagnosisPointers: this.fb.group({
        ptr1: [''],
        ptr2: [''],
        ptr3: [''],
        ptr4: [''],
        ptr5: [''],
        ptr6: [''],
        ptr7: [''],
        ptr8: ['']
      })
    });
  }

  addService() {
    this.procedures.push(this.createProcedureGroup());
  }

  removeService(index: number) {
    this.procedures.removeAt(index);
  }

  clearService(index: number) {
    const procedure = this.procedures.at(index);
    procedure.reset();
  }
}