import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DraftItem } from './types';

@Component({
  selector: 'app-incomplete-drafts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule],
  template: `
    <mat-card class="dashboard-card">
      <mat-card-content>
        <h2 class="card-title">
          Incomplete Drafts
          <button mat-button class="view-button" (click)="viewAllDrafts()">View Dashboard</button>
        </h2>

        <ng-container *ngIf="loading">
          <div class="loading-skeleton">
            <div class="skeleton-row"></div>
            <div class="skeleton-row"></div>
            <div class="skeleton-row"></div>
          </div>
        </ng-container>

        <ng-container *ngIf="error">
          <div class="error-state">
            <p>Unable to load drafts</p>
            <button mat-button color="primary" (click)="retry()">Retry</button>
          </div>
        </ng-container>

        <div class="drafts-container">
          <table mat-table [dataSource]="drafts" class="drafts-table" *ngIf="!loading && !error">
            <ng-container matColumnDef="memberName">
              <th mat-header-cell *matHeaderCellDef>Member Name (ID)</th>
              <td mat-cell *matCellDef="let draft">
                {{draft.memberName}}
                <span class="member-id">(DOS {{draft.createdAt | date:'MM/yy'}})</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="membershipType">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let draft">{{draft.membershipType}}</td>
            </ng-container>

            <ng-container matColumnDef="expirationDate">
              <th mat-header-cell *matHeaderCellDef>Expiration Date</th>
              <td mat-cell *matCellDef="let draft">{{draft.expirationDate | date:'MM/dd/yyyy'}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let draft">
                <button mat-button class="view-button" (click)="viewDraft(draft.memberId)">
                  <a href="javascript:void(0)">View</a>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      height: 364px;
    }

    .dashboard-card {
      height: 100%;
    }

    mat-card-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 24px !important;
    }

    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .drafts-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .drafts-table {
      width: 100%;
    }

    .view-button {
      color: #002F81;
      font-weight: 500;
    }

    .view-button a {
      color: inherit;
      text-decoration: none;
    }

    .member-id {
      color: #666;
      font-size: 12px;
      margin-left: 8px;
    }

    .loading-skeleton {
      padding: 16px 0;
      flex: 1;
    }

    .skeleton-row {
      height: 40px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .error-state {
      text-align: center;
      padding: 24px;
      color: #666;
      flex: 1;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .mat-mdc-row {
      cursor: pointer;
    }

    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }

    .mat-mdc-header-cell {
      color: #666;
      font-weight: 500;
    }

    .mat-mdc-cell {
      color: #333;
    }

    /* Handle overflow */
    .drafts-table {
      overflow: auto;
    }

    /* Ensure consistent row heights */
    .mat-mdc-row, .mat-mdc-header-row {
      height: 48px;
    }
  `]
})
export class IncompleteDraftsComponent implements OnInit {
  drafts: DraftItem[] = [];
  displayedColumns: string[] = ['memberName', 'membershipType', 'expirationDate', 'actions'];
  loading = true;
  error = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchDrafts();
  }

  async fetchDrafts() {
    this.loading = true;
    this.error = false;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.drafts = [
        {
          memberId: 'DOS 02/20',
          memberName: 'Alan Smith',
          membershipType: 'A',
          expirationDate: new Date(2025, 2, 20),
          createdAt: new Date(2024, 1, 20)
        },
        {
          memberId: 'DOS 02/10',
          memberName: 'Jordan Health',
          membershipType: 'A',
          expirationDate: new Date(2025, 2, 20),
          createdAt: new Date(2024, 1, 10)
        }
      ];
      this.loading = false;
    } catch (e) {
      console.error('Failed to fetch drafts:', e);
      this.error = true;
      this.loading = false;
    }
  }

  viewDraft(memberId: string) {
    this.router.navigate(['/drafts', memberId]);
  }

  viewAllDrafts() {
    this.router.navigate(['/drafts']);
  }

  retry() {
    this.fetchDrafts();
  }
}