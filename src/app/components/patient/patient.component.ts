import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Patient, PatientService } from '../../services/patient.service';
import { Analysis, AnalysisService } from '../../services/analysis.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-patient',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, AfterViewInit {
  patient: Patient | undefined;
  displayedColumns: string[] = ['id', 'birads_score', 'radiologist_birads_score', 'created_at', 'action'];
  dataSource: MatTableDataSource<Analysis> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private analysisService: AnalysisService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientService.getPatients().subscribe(patients => {
      if (patientId) {
        const found = patients.find(p => p.id === patientId);
        if (found) {
          this.patient = found;
          this.analysisService.getAnalysesByPatientId(this.patient.id).subscribe(analyses => {
            this.dataSource.data = analyses;
            this.dataSource.sort = this.sort;
          });
        } else {
          this.snackBar.open('Patient not found', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        }
      } else {
        this.snackBar.open('Patient ID not provided', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAnalysisClick(analysis: Analysis): void {
    if (this.patient && analysis.duration_time_ms !== 0) {
      this.router.navigate(['/patient', this.patient.id, 'analysis', analysis.id]);
    }
  }

  newAnalysis() {
    if (this.patient && this.patient.id) {
      this.router.navigate(['/patient', this.patient.id, 'analysis', 'new']);
    }
  }
}
