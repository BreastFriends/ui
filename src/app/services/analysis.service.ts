import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface AnalysisImage {
  image_id: string;
  visit_id: string;
  view_type: 'CC' | 'MLO';
  breast_side: 'L' | 'R';
  acquisition_timestamp: Date;
  image_uri: string;
  created_at: Date;
  pixel_spacing_x: number;
  pixel_spacing_y: number;
}

export interface AnalysisLesion {
  analysis_id: string;
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  area_pixels: number;
  width_mm: number;
  height_mm: number;
  lesion_type: string;
  confidence: number;
  radiologist_confirmed: boolean;
}

export interface Analysis {
  id: string;
  patientId: string;
  started_at: Date;
  finished_at: Date;
  duration_time_ms: number;
  birads_model_version_id: string;
  lesion_model_verson_id: string;
  birads_score: number;
  birads_confidence: number;
  radiologist_reviewed: boolean;
  radiologist_birads_score: number;
  num_lesions_detected: number;
  num_lesions_confirmed: number;
  notes: string;
  created_at: Date;
  images: AnalysisImage[];
  lesions: AnalysisLesion[];
}

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  // Dummy placeholder data using the new schema.
  private dummyAnalyses: Analysis[] = [
    {
      id: '1',
      patientId: '1',
      started_at: new Date('2025-02-01T08:00:00'),
      finished_at: new Date('2025-02-01T08:30:00'),
      duration_time_ms: 1800000,
      birads_model_version_id: 'v1.0',
      lesion_model_verson_id: 'v1.0',
      birads_score: 3,
      birads_confidence: 0.85,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      num_lesions_detected: 1,
      num_lesions_confirmed: 0,
      notes: 'Initial analysis: one potential lesion detected.',
      created_at: new Date('2025-02-01T08:35:00'),
      images: [
        {
          image_id: 'img1',
          visit_id: 'visit1',
          view_type: 'CC',
          breast_side: 'L',
          acquisition_timestamp: new Date('2025-02-01T07:55:00'),
          image_uri: 'assets/images/analysis1/L_CC.jpg',
          created_at: new Date('2025-02-01T08:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        },
        {
          image_id: 'img2',
          visit_id: 'visit1',
          view_type: 'MLO',
          breast_side: 'L',
          acquisition_timestamp: new Date('2025-02-01T07:56:00'),
          image_uri: 'assets/images/analysis1/L_MLO.jpg',
          created_at: new Date('2025-02-01T08:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        },
        {
          image_id: 'img3',
          visit_id: 'visit1',
          view_type: 'CC',
          breast_side: 'R',
          acquisition_timestamp: new Date('2025-02-01T07:57:00'),
          image_uri: 'assets/images/analysis1/R_CC.jpg',
          created_at: new Date('2025-02-01T08:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        },
        {
          image_id: 'img4',
          visit_id: 'visit1',
          view_type: 'MLO',
          breast_side: 'R',
          acquisition_timestamp: new Date('2025-02-01T07:58:00'),
          image_uri: 'assets/images/analysis1/R_MLO.jpg',
          created_at: new Date('2025-02-01T08:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        }
      ],
      lesions: [
        {
          analysis_id: '1',
          xmin: 50,
          xmax: 150,
          ymin: 60,
          ymax: 160,
          area_pixels: 10000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: 'Mass',
          confidence: 0.9,
          radiologist_confirmed: false
        }
      ]
    },
    {
      id: '2',
      patientId: '2',
      started_at: new Date('2025-02-05T09:00:00'),
      finished_at: new Date('2025-02-05T09:25:00'),
      duration_time_ms: 1500000,
      birads_model_version_id: 'v1.0',
      lesion_model_verson_id: 'v1.0',
      birads_score: 2,
      birads_confidence: 0.95,
      radiologist_reviewed: true,
      radiologist_birads_score: 2,
      num_lesions_detected: 0,
      num_lesions_confirmed: 0,
      notes: 'No suspicious lesions detected.',
      created_at: new Date('2025-02-05T09:30:00'),
      images: [
        {
          image_id: 'img5',
          visit_id: 'visit2',
          view_type: 'CC',
          breast_side: 'L',
          acquisition_timestamp: new Date('2025-02-05T08:55:00'),
          image_uri: 'assets/images/analysis2/L_CC.jpg',
          created_at: new Date('2025-02-05T09:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        },
        {
          image_id: 'img6',
          visit_id: 'visit2',
          view_type: 'MLO',
          breast_side: 'L',
          acquisition_timestamp: new Date('2025-02-05T08:56:00'),
          image_uri: 'assets/images/analysis2/L_MLO.jpg',
          created_at: new Date('2025-02-05T09:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        },
        {
          image_id: 'img7',
          visit_id: 'visit2',
          view_type: 'CC',
          breast_side: 'R',
          acquisition_timestamp: new Date('2025-02-05T08:57:00'),
          image_uri: 'assets/images/analysis2/R_CC.jpg',
          created_at: new Date('2025-02-05T09:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        },
        {
          image_id: 'img8',
          visit_id: 'visit2',
          view_type: 'MLO',
          breast_side: 'R',
          acquisition_timestamp: new Date('2025-02-05T08:58:00'),
          image_uri: 'assets/images/analysis2/R_MLO.jpg',
          created_at: new Date('2025-02-05T09:00:00'),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1
        }
      ],
      lesions: [] // No lesions detected
    }
  ];

  /**
   * Retrieves a list of previous analyses.
   * @returns Observable<Analysis[]> - a stream of Analysis records.
   */
  getAnalyses(): Observable<Analysis[]> {
    // Real API call: return this.http.get<Analysis[]>(this.baseUrl);
    return of(this.dummyAnalyses);
  }

  /**
   * Retrieves a single analysis by its id.
   * @param analysisId string - the id of the analysis.
   * @returns Observable<Analysis> - a stream with the analysis record.
   */
  getAnalysisById(analysisId: string): Observable<Analysis | undefined> {
    const analysis = this.dummyAnalyses.find(a => a.id === analysisId);
    return of(analysis);
  }

  /**
 * Retrieves all analyses for a specific patient.
 * @param patientId string - the patient ID to filter by.
 * @returns Observable<Analysis[]> - a stream with the matching analyses.
 */
  getAnalysesByPatientId(patientId: string): Observable<Analysis[]> {
    const analyses = this.dummyAnalyses.filter(a => a.patientId === patientId);
    return of(analyses);
  }
}
