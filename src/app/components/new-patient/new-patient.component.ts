import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Patient } from '../../services/patient.service';

@Component({
  selector: 'app-new-patient',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.scss'
})
export class NewPatientComponent {
  patient: Patient = {
    id: '',
    firstName: '',
    lastName: '',
    oib: '',
    dateOfBirth: new Date(),
    address: '',
    contactPhone: '',
    email: '',
    usesHormoneTherapy: false,
    hasFamilyHistoryOfCancer: false,
    hasHadCancer: false,
    isInMenopause: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  savePatient(form: NgForm) {
    if (form.valid) {
      this.snackBar.open('Patient saved successfully', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/']);
    } else {
      this.snackBar.open('Please fill out all required fields', 'Close', {
        duration: 3000
      });
    }
  }
}
