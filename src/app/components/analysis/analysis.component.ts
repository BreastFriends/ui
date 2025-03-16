import { Component, OnInit } from '@angular/core';
import { AnalysisService, Analysis, AnalysisImage } from '../../services/analysis.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  analysis: Analysis | undefined;
  leftImages: AnalysisImage[] = [];
  rightImages: AnalysisImage[] = [];

  constructor(
    private analysisService: AnalysisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const analysisId = this.route.snapshot.paramMap.get('id');
    if (analysisId) {
      this.analysisService.getAnalysisById(analysisId).subscribe((analysis) => {
        this.analysis = analysis;
        if (analysis) {
          this.leftImages = analysis.images.filter(img => img.breast_side === 'L');
          this.rightImages = analysis.images.filter(img => img.breast_side === 'R');
        }
      });
    }
  }
}
