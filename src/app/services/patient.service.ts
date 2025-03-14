import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Patient {
  id: string;
  oib: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  contactPhone: string;
  email: string;
  usesHormoneTherapy: boolean;
  hasFamilyHistoryOfCancer: boolean;
  hasHadCancer: boolean;
  isInMenopause: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // Static dummy placeholder data
  private dummyPatients: Patient[] = [
    {
      id: '1',
      oib: '12345678901',
      firstName: 'Alice',
      lastName: 'Smith',
      dateOfBirth: new Date('1975-04-15'),
      address: '123 Maple Street, Zagreb',
      contactPhone: '+385-91-1234567',
      email: 'alice.smith@example.com',
      usesHormoneTherapy: false,
      hasFamilyHistoryOfCancer: true,
      hasHadCancer: false,
      isInMenopause: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      oib: '09876543210',
      firstName: 'Maria',
      lastName: 'Johnson',
      dateOfBirth: new Date('1982-11-30'),
      address: '456 Oak Avenue, Split',
      contactPhone: '+385-92-7654321',
      email: 'maria.johnson@example.com',
      usesHormoneTherapy: true,
      hasFamilyHistoryOfCancer: false,
      hasHadCancer: false,
      isInMenopause: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      oib: '11223344556',
      firstName: 'Laura',
      lastName: 'Brown',
      dateOfBirth: new Date('1968-07-20'),
      address: '789 Pine Road, Rijeka',
      contactPhone: '+385-93-1122334',
      email: 'laura.brown@example.com',
      usesHormoneTherapy: true,
      hasFamilyHistoryOfCancer: true,
      hasHadCancer: true,
      isInMenopause: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() { }

  /**
   * Retrieves a list of all patients.
   * @returns Observable<Patient[]> - a stream of Patient records.
   */
  getPatients(): Observable<Patient[]> {
    return of(this.dummyPatients);
  }
}
