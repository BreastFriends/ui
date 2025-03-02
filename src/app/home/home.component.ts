import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../services/analysis.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  analyses: any[] = [];

  constructor(private analysisService: AnalysisService) {}

  ngOnInit(): void {
    this.analysisService.getPreviousAnalyses().subscribe(data => {
      this.analyses = data;
    });
  }
}
