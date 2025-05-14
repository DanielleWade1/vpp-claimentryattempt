import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-action-selector',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule],
  template: `
    <div class="action-selector">
      <mat-radio-group [(ngModel)]="selectedAction" (ngModelChange)="onActionChange($event)" class="radio-group">
        <label class="radio-button" [class.mat-mdc-radio-checked]="selectedAction === 'claim'">
          <mat-radio-button value="claim" class="radio-input">
            <div class="radio-content">
              <i class="material-icons">description</i>
              Claim and Order
            </div>
          </mat-radio-button>
        </label>
        <label class="radio-button" [class.mat-mdc-radio-checked]="selectedAction === 'auth'">
          <mat-radio-button value="auth" class="radio-input">
            <div class="radio-content">
              <i class="material-icons">lock</i>
              Authorizations
            </div>
          </mat-radio-button>
        </label>
      </mat-radio-group>
    </div>
  `,
  styles: [`
    .action-selector {
      width: 100%;
      margin-top: 20px;
    }

    .radio-group {
      display: flex;
      gap: 20px;
      width: 100%;
    }

    .radio-button {
      flex: 1;
      display: block;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .radio-button:hover {
      background-color: #f0f7ff;
    }

    .radio-button.mat-mdc-radio-checked {
      border: 2px solid #002F81;
    }

    .radio-button ::ng-deep .mdc-form-field {
      width: 100%;
    }

    .radio-button ::ng-deep .mdc-radio {
      margin-right: 12px;
    }

    .radio-button ::ng-deep .mdc-form-field > label {
      font-size: 16px;
      font-weight: 500;
    }

    .radio-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .material-icons {
      font-size: 20px;
      color: #666;
    }

    /* Accessibility enhancements */
    .radio-button:focus-within {
      outline: 2px solid #002F81;
      outline-offset: 2px;
    }

    /* Hide default focus outline on radio button when container is focused */
    .radio-button:focus-within .radio-input ::ng-deep .mdc-radio {
      outline: none;
    }

    /* Ensure radio button remains visible for screen readers */
    .radio-input {
      display: block;
    }
  `]
})
export class ActionSelectorComponent {
  selectedAction = 'claim';
  @Output() actionChange = new EventEmitter<string>();

  onActionChange(value: string) {
    this.actionChange.emit(value);
  }
}