import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Analysis {
  id: string;
  name: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private baseUrl = '/api/analyses';

  constructor(private http: HttpClient) {}

  // Static dummy placeholder data
  private dummyAnalyses: Analysis[] = [
    { id: '1', name: 'Mammography Analysis 1', date: new Date('2025-02-01') },
    { id: '2', name: 'Mammography Analysis 2', date: new Date('2025-02-05') },
    { id: '3', name: 'Mammography Analysis 3', date: new Date('2025-02-10') },
  ];

  /**
   * Retrieves a list of previous analyses.
   * @returns Observable<Analysis[]> - a stream of analysis records.
   */
  getAnalyses(): Observable<Analysis[]> {
    // return this.http.get<Analysis[]>(this.baseUrl);
    return of(this.dummyAnalyses);
  }
}
