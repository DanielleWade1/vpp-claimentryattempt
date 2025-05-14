import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EyeglassMetrics } from './types';

@Component({
  selector: 'app-eyeglass-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="dashboard-card">
      <mat-card-content>
        <h2 class="card-title">
          Eyeglass Orders
          <button mat-button class="view-button" (click)="viewDashboard()">View Dashboard</button>
        </h2>
        
        <div class="metrics-list">
          <div class="metric-item">
            <span class="metric-label">Entered</span>
            <span class="metric-value">{{metrics.entered}}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Submitted</span>
            <span class="metric-value">{{metrics.submitted}}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">In Process</span>
            <span class="metric-value">{{metrics.inProcess}}</span>
          </div>
          <div class="metric-item">
            <span class="metric-label">Shipped (Last 30 Days)</span>
            <span class="metric-value">{{metrics.shipped}}</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .view-button {
      color: #002F81;
      font-weight: 500;
    }

    .metrics-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    .metric-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .metric-item:last-child {
      border-bottom: none;
    }

    .metric-label {
      color: #666;
      font-size: 14px;
    }

    .metric-value {
      font-size: 16px;
      font-weight: 500;
      color: #002F81;
      background-color: #e3f2fd;
      padding: 4px 12px;
      border-radius: 16px;
      min-width: 24px;
      text-align: center;
    }
  `]
})
export class EyeglassOrdersComponent implements OnInit {
  metrics: EyeglassMetrics = {
    entered: 3,
    submitted: 0,
    inProcess: 2,
    shipped: 1
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchMetrics();
  }

  async fetchMetrics() {
    try {
      // SQL queries for each metric
      const enteredQuery = `
        SELECT COUNT(*) as count
        FROM eyeglass_orders
        WHERE status = 'entered'
        AND created_at >= NOW() - INTERVAL '30 days';
      `;

      const submittedQuery = `
        SELECT COUNT(*) as count
        FROM eyeglass_orders
        WHERE status = 'submitted'
        AND submitted_at >= NOW() - INTERVAL '30 days';
      `;

      const inProcessQuery = `
        SELECT COUNT(*) as count
        FROM eyeglass_orders
        WHERE status = 'processing'
        AND updated_at >= NOW() - INTERVAL '30 days';
      `;

      const shippedQuery = `
        SELECT COUNT(*) as count
        FROM eyeglass_orders
        WHERE status = 'shipped'
        AND shipped_at >= NOW() - INTERVAL '30 days';
      `;

      // For now using mock data
      // TODO: Implement actual database queries
    } catch (error) {
      console.error('Failed to fetch eyeglass metrics:', error);
    }
  }

  viewDashboard() {
    this.router.navigate(['/eyeglass-orders']);
  }
}