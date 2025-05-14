import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorizationData } from './types';

@Component({
  selector: 'app-review-authorizations',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './review-authorizations.component.html',
  styleUrls: ['./review-authorizations.component.css']
})
export class ReviewAuthorizationsComponent {
  auth: AuthorizationData | undefined;
  currentDate = new Date();

  constructor(private router: Router) {
    // Temporary mock data
    this.auth = {
      authNumber: 'A022052400001',
      patientName: 'Tony Perez',
      dob: '05/22/1964',
      providerName: 'Tony Glasses',
      anticipatedDOS: '03/27/2024',
      enteredDate: '05/24/2022',
      determinationDate: '-',
      status: 'Not Applicable',
      dateReceived: '05/24/2022 7:00 AM',
      dateEntered: '05/24/2022',
      providerDetails: {
        id: '123456789564',
        name: 'Tony Glasses',
        practice: 'Glasses Plus',
        address: '4002 Apple Street',
        city: 'Mequon',
        state: 'WI',
        zip: '53092'
      },
      patientDetails: {
        address: '4002 Apple Street',
        city: 'Mequon',
        state: 'WI',
        zip: '53092'
      },
      authorizationDetails: {
        vision: 'Vision 1x 2.0.2022',
        benefitLevel: 'In Network',
        referralNumber: '',
        clientAuthId: ''
      },
      diagnosisCodes: [
        { code: '1', description: 'Ophth Serv: Med Exam: Comp New PT 1 / More Visits' },
        { code: '2', description: 'DIL Retian Exam Interp Rev' }
      ],
      services: [
        {
          code: 'V251',
          description: 'Lens Hydrophil Toric/Prims Ballst Per Lens',
          quantity: 1,
          quantityDenied: 1,
          quantityConsumed: 1,
          placeOfService: 1,
          serviceDateFrom: '05/04/2022',
          serviceDateTo: '05/04/2022',
          determinationDate: '-',
          determinationStatus: 'Not Applicable',
          determinationReason: '-',
          amountRequested: '-',
          amountAuthorized: '0.00',
          authorizationService: 'Auth Not Required'
        }
      ],
      notes: 'These are some notes',
      amountAuthorized: 25.00
    };
  }

  goBack() {
    this.router.navigate(['/']);
  }

  close() {
    this.router.navigate(['/']);
  }
}