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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  patient: Patient | undefined;
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: MatTableDataSource<Analysis> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private patientService: PatientService,
    private analysisService: AnalysisService
  ) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patient = patients[0];
    });

    this.analysisService.getAnalyses().subscribe(analyses => {
      this.dataSource.data = analyses;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
