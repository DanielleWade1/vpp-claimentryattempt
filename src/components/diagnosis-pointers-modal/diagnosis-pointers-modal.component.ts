import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnosis-pointers-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <div class="modal-container">
      <h2 mat-dialog-title>Add Diagnosis Pointers</h2>
      
      <mat-dialog-content>
        <div class="pointers-grid">
          <div class="pointer-field" *ngFor="let i of [1,2,3,4,5,6,7,8]">
            <label>Diagnosis Ptr {{i}}</label>
            <mat-form-field appearance="outline">
              <input matInput [(ngModel)]="diagnosisPointers[i-1]">
            </mat-form-field>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" (click)="onSave()">Save</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .modal-container {
      padding: 20px;
      min-width: 600px;
    }

    h2 {
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 500;
      color: #333;
    }

    .pointers-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }

    .pointer-field {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 8px;
      color: #666;
      font-size: 14px;
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-actions {
      margin-top: 24px;
      padding: 0;
    }

    @media (max-width: 768px) {
      .pointers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DiagnosisPointersModalComponent {
  diagnosisPointers: string[] = new Array(8).fill('');

  constructor(
    public dialogRef: MatDialogRef<DiagnosisPointersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.pointers) {
      this.diagnosisPointers = [...data.pointers];
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.diagnosisPointers);
  }
}