import { Component, OnInit } from '@angular/core';
import { AnalysisService, Analysis, AnalysisImage } from '../../services/analysis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButton,
    NgxImageZoomModule
  ],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  analysis: Analysis | undefined;
  leftImages: AnalysisImage[] = [];
  rightImages: AnalysisImage[] = [];

  constructor(
    private analysisService: AnalysisService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const analysisId = this.route.snapshot.paramMap.get('analysisId');
    const patientId = this.route.snapshot.paramMap.get('patientId');

    if (analysisId) {
      this.analysisService.getAnalysisById(analysisId).subscribe(analysis => {
        if (analysis && analysis.patientId === patientId) {
          this.analysis = analysis;
          this.leftImages = analysis.images.filter(img => img.breast_side === 'L');
          this.rightImages = analysis.images.filter(img => img.breast_side === 'R');
        } else {
          this.snackBar.open('Analysis not found', 'Close', { duration: 3000 });
          if (patientId) {
            this.router.navigate(['/patient', patientId]);
          } else {
            this.router.navigate(['/']);
          }
        }
      });
    } else {
      this.snackBar.open('Analysis ID not provided', 'Close', { duration: 3000 });
      if (patientId) {
        this.router.navigate(['/patient', patientId]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onRadiologistBiradsScoreChange(): void {
    this.snackBar.open('BIRADS Score saved', 'Close', { duration: 3000 });
  }

  onNotesSave(): void {
    this.snackBar.open("Notes saved", 'Close', { duration: 3000 });
  }
}
