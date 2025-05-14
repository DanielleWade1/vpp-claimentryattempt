import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-claim360-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar class="top-nav">
      <div class="left-section">
        <img src="assets/skygen-white.svg" alt="" class="logo">
        <div class="nav-links">
          <a href="#" class="nav-link">Home</a>
          <a href="#" class="nav-link">Authorization</a>
          <a href="#" class="nav-link">Claims</a>
          <a href="#" class="nav-link">Entity Management</a>
          <a href="#" class="nav-link">Resource Center</a>
          <a href="#" class="nav-link">Contact Us</a>
        </div>
      </div>
      <div class="toolbar-right">
        <button class="personal-info-button">Hello, Albert Gilbert</button>
        <mat-icon>notifications</mat-icon>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .top-nav {
      background-color: #002F81;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 60px;
      position: sticky;
      top: 0;
      z-index: 1000;
      height: 64px;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .logo {
      height: 40px;
      width: auto;
      object-fit: contain;
    }

    .nav-links {
      display: flex;
      gap: 24px;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 8px 0;
      position: relative;
      font-size: 14px;
    }

    .nav-link:hover::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .personal-info-button {
      background-color: #042462 !important;
      color: white;
      font-size: 14px !important;
      font-family: 'Inter', sans-serif !important;
      font-weight: var(--font-weight-medium) !important;
      border: none;
      cursor: pointer;
      padding: 8px 20px;
      border-radius: 100pt;
    }

    @media (max-width: 768px) {
      .top-nav {
        padding: 0 20px;
      }

      .nav-links {
        display: none;
      }
    }
  `]
})
export class Claim360HeaderComponent {}