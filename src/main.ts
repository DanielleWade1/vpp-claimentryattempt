import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { ReviewAuthorizationsComponent } from './review-authorizations.component';
import { Claim360Component } from './claim360.component';
import { ClaimEntryComponent } from './claim-entry.component';

const routes = [
  { path: '', component: DashboardComponent },
  { path: 'authorizations', component: HomeComponent },
  { path: 'review/:id', component: ReviewAuthorizationsComponent },
  { path: 'claim360', component: Claim360Component },
  { path: 'claim-entry', component: ClaimEntryComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));