import { Component, OnInit } from '@angular/core';
import { AnalysisService, Analysis } from '../../services/analysis.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis',
  imports: [CommonModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnInit {
  analysis: Analysis | undefined;

  constructor(
    private analysisService: AnalysisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const analysisId = this.route.snapshot.paramMap.get('id');
    if (analysisId) {
      this.analysisService.getAnalysisById(analysisId).subscribe((analysis) => {
        this.analysis = analysis;
      });
    }
  }
}
