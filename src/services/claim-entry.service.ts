import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DiagnosisFormData {
  primaryDiagnosis: string;
  diagnosisCode2: string;
  diagnosisCode3: string;
  diagnosisCode4: string;
  hasDiabetes: string;
  isReferred: string;
  referralCode: string;
}

export interface ExamFormData {
  procedureCode1: string;
  procedureAmount1: number | null;
  procedureCode2: string;
  procedureAmount2: number | null;
  procedureCode3: string;
  procedureAmount3: number | null;
  medicallyNecessary: boolean;
  modifier1: string;
  modifier2: string;
  modifier3: string;
  modifier4: string;
  dilatedExam: boolean;
  glaucomaTested: boolean;
  hasDiabetes: boolean;
  diabetesDiagnosisCode: string;
  diabetesCPTII: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimEntryService {
  private diagnosisFormSubject = new BehaviorSubject<FormGroup>(this.createDiagnosisForm());
  private examFormSubject = new BehaviorSubject<FormGroup>(this.createExamForm());
  private diagnosisPointersSubject = new BehaviorSubject<string[]>(new Array(8).fill(''));

  diagnosisForm$: Observable<FormGroup> = this.diagnosisFormSubject.asObservable();
  examForm$: Observable<FormGroup> = this.examFormSubject.asObservable();
  diagnosisPointers$: Observable<string[]> = this.diagnosisPointersSubject.asObservable();

  constructor(private fb: FormBuilder) {}

  private createDiagnosisForm(): FormGroup {
    return this.fb.group({
      primaryDiagnosis: ['', Validators.required],
      diagnosisCode2: [''],
      diagnosisCode3: [''],
      diagnosisCode4: [''],
      hasDiabetes: ['no', Validators.required],
      isReferred: ['no', Validators.required],
      referralCode: ['']
    });
  }

  private createExamForm(): FormGroup {
    return this.fb.group({
      procedureCode1: ['', Validators.required],
      procedureAmount1: [null, [Validators.required, Validators.min(0)]],
      procedureCode2: [''],
      procedureAmount2: [null],
      procedureCode3: [''],
      procedureAmount3: [null],
      medicallyNecessary: [false],
      modifier1: [''],
      modifier2: [''],
      modifier3: [''],
      modifier4: [''],
      dilatedExam: [false],
      glaucomaTested: [false],
      hasDiabetes: [false],
      diabetesDiagnosisCode: [''],
      diabetesCPTII: ['']
    });
  }

  updateDiagnosisForm(data: Partial<DiagnosisFormData>): void {
    const currentForm = this.diagnosisFormSubject.value;
    currentForm.patchValue(data);
    this.diagnosisFormSubject.next(currentForm);
  }

  updateExamForm(data: Partial<ExamFormData>): void {
    const currentForm = this.examFormSubject.value;
    currentForm.patchValue(data);
    this.examFormSubject.next(currentForm);
  }

  updateDiagnosisPointers(pointers: string[]): void {
    this.diagnosisPointersSubject.next(pointers);
  }

  resetDiagnosisForm(): void {
    this.diagnosisFormSubject.next(this.createDiagnosisForm());
  }

  resetExamForm(): void {
    this.examFormSubject.next(this.createExamForm());
  }

  getDiagnosisForm(): FormGroup {
    return this.diagnosisFormSubject.value;
  }

  getExamForm(): FormGroup {
    return this.examFormSubject.value;
  }

  getDiagnosisPointers(): string[] {
    return this.diagnosisPointersSubject.value;
  }
}