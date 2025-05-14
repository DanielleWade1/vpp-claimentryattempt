export interface AuthorizationData {
  authNumber: string;
  patientName: string;
  dob: string;
  providerName: string;
  anticipatedDOS: string;
  enteredDate: string;
  determinationDate: string;
  status: string;
  dateReceived?: string;
  dateEntered?: string;
  expirationDate?: string;
  providerDetails?: {
    id: string;
    name: string;
    practice: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  patientDetails?: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  authorizationDetails?: {
    vision: string;
    benefitLevel: string;
    referralNumber: string;
    clientAuthId: string;
  };
  diagnosisCodes?: Array<{
    code: string;
    description: string;
  }>;
  services?: Array<{
    code: string;
    description: string;
    quantity: number;
    quantityDenied: number;
    quantityConsumed: number;
    placeOfService: number;
    serviceDateFrom: string;
    serviceDateTo: string;
    determinationDate: string;
    determinationStatus: string;
    determinationReason: string;
    amountRequested: string;
    amountAuthorized: string;
    authorizationService: string;
  }>;
  notes?: string;
  amountAuthorized?: number;
}

export interface SearchCriteria {
  status: string;
  authNumber: string;
  anticipatedServiceDateRange: {
    start: Date | null;
    end: Date | null;
  };
  enteredDateRange: {
    start: Date | null;
    end: Date | null;
  };
  determinationDateRange: {
    start: Date | null;
    end: Date | null;
  };
  firstName: string;
  lastName: string;
  subscriberId: string;
  insurer: string;
}

export interface PaymentTransaction {
  transaction_date: string;
  amount: number;
  payment_status?: string;
  payment_method?: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  date: Date;
  viewed: boolean;
  status: string;
  type: 'IMPORTANT' | 'INFO' | 'WARNING';
  details: {
    maintenanceWindow: string;
    affectedSystems: string[];
    improvements: string[];
    userActions: string[];
    supportContact: {
      email: string;
      phone: string;
      hours: string;
    };
  };
}

export interface DraftItem {
  memberId: string;
  memberName: string;
  membershipType: string;
  expirationDate: Date;
  createdAt: Date;
}

export interface EyeglassMetrics {
  entered: number;
  submitted: number;
  inProcess: number;
  shipped: number;
}

export interface ContactLensMetrics {
  entered: number;
  submitted: number;
  inProcess: number;
  shipped: number;
}

export interface Member {
  id: string;
  name: string;
  dob: string;
  address: string;
  products: Product[];
  familyMembers: string[];
}

export interface Product {
  name: string;
  isEligible: boolean;
  benefits: Benefit[];
}

export interface Benefit {
  name: string;
  allowance: number;
  isAvailable: boolean;
  participatingProviders?: string;
  nextAvailableDate?: string;
}

export interface ServiceCategory {
  name: string;
  status: 'Available' | 'Unavailable';
  selected: boolean;
  disabled: boolean;
  nextAvailable?: string;
}

export interface BenefitGroup {
  name: string;
  note?: string;
  categories: ServiceCategory[];
}