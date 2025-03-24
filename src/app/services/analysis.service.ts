import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface AnalysisImage {
  image_id: string;
  study_id: string;
  series_id: string;
  view_type: 'CC' | 'MLO';
  breast_side: 'L' | 'R';
  breast_density: 'DENSITY A' | 'DENSITY B' | 'DENSITY C' | 'DENSITY D';
  height: number;
  width: number;
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
  lesion_birads: number;
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
  lesion_model_version_id: string;
  birads_score: number;
  birads_confidence: number;
  radiologist_reviewed: boolean;
  radiologist_birads_score: number;
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
      id: "f3i72f392eq03dk6f62ksd567sd32400f",
      patientId: "1",
      started_at: new Date("2025-03-25T10:00:00"),
      finished_at: new Date("1970-01-01T00:00:00"),
      duration_time_ms: 0,
      birads_model_version_id: "v1.0",
      lesion_model_version_id: "v1.0",
      birads_score: 0,
      birads_confidence: 0.0,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      notes: "Analysis from CSV data (findings detected)",
      created_at: new Date("2025-03-23T10:05:00"),
      images: [],
      lesions: []
    },
    {
      id: "9cd11142270fc4e1188ccc8b02d23322",
      patientId: "1",
      started_at: new Date("2025-03-23T10:00:00"),
      finished_at: new Date("2025-03-23T10:04:00"),
      duration_time_ms: 240000,
      birads_model_version_id: "v1.0",
      lesion_model_version_id: "v1.0",
      birads_score: 3,
      birads_confidence: 0.9,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      notes: "Analysis from CSV data (findings detected)",
      created_at: new Date("2025-03-23T10:05:00"),
      images: [
        {
          image_id: "35529cbc5b22c72b5da91ca7dd44a834",
          study_id: "9cd11142270fc4e1188ccc8b02d23322",
          series_id: "b0c1406a8359332d7f3590e894ba62a8",
          view_type: "CC",
          breast_side: "R",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:00:00"),
          image_uri:
            "assets/analysis/9cd11142270fc4e1188ccc8b02d23322/35529cbc5b22c72b5da91ca7dd44a834_R_CC.png",
          created_at: new Date("2025-03-23T10:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "c2ad20b85df240f3cef3681b3ee847b2",
          study_id: "9cd11142270fc4e1188ccc8b02d23322",
          series_id: "b0c1406a8359332d7f3590e894ba62a8",
          view_type: "CC",
          breast_side: "L",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:01:00"),
          image_uri:
            "assets/analysis/9cd11142270fc4e1188ccc8b02d23322/c2ad20b85df240f3cef3681b3ee847b2_L_CC.png",
          created_at: new Date("2025-03-23T10:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "5e4e0eb37056fddb893c7a5c6ac33a5b",
          study_id: "9cd11142270fc4e1188ccc8b02d23322",
          series_id: "b0c1406a8359332d7f3590e894ba62a8",
          view_type: "MLO",
          breast_side: "R",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:02:00"),
          image_uri:
            "assets/analysis/9cd11142270fc4e1188ccc8b02d23322/5e4e0eb37056fddb893c7a5c6ac33a5b_R_MLO.png",
          created_at: new Date("2025-03-23T10:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "af57a0fab5ac65a0649e1c704dd9ff77",
          study_id: "9cd11142270fc4e1188ccc8b02d23322",
          series_id: "b0c1406a8359332d7f3590e894ba62a8",
          view_type: "MLO",
          breast_side: "L",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:03:00"),
          image_uri:
            "assets/analysis/9cd11142270fc4e1188ccc8b02d23322/af57a0fab5ac65a0649e1c704dd9ff77_L_MLO.png",
          created_at: new Date("2025-03-23T10:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
      ],
      lesions: [
        {
          analysis_id: "9cd11142270fc4e1188ccc8b02d23322",
          xmin: 2690.090088,
          xmax: 2798.050049,
          ymin: 1202.069946,
          ymax: 1341.800049,
          area_pixels: 15070,
          width_mm: 10.80,
          height_mm: 13.97,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "9cd11142270fc4e1188ccc8b02d23322",
          xmin: 314.531006,
          xmax: 396.950989,
          ymin: 1930.839966,
          ymax: 1993.150024,
          area_pixels: 5136,
          width_mm: 8.24,
          height_mm: 6.23,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "9cd11142270fc4e1188ccc8b02d23322",
          xmin: 2189.76001,
          xmax: 2269.199951,
          ymin: 1441.189941,
          ymax: 1585.170044,
          area_pixels: 11428,
          width_mm: 7.94,
          height_mm: 14.40,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "9cd11142270fc4e1188ccc8b02d23322",
          xmin: 234.889008,
          xmax: 307.174988,
          ymin: 2081.330078,
          ymax: 2143.719971,
          area_pixels: 4510,
          width_mm: 7.23,
          height_mm: 6.24,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
      ],
    },
    {
      id: "c731169675259101e314d73d9e982444",
      patientId: "1",
      started_at: new Date("2025-03-23T10:10:00"),
      finished_at: new Date("2025-03-23T10:14:00"),
      duration_time_ms: 240000,
      birads_model_version_id: "v1.0",
      lesion_model_version_id: "v1.0",
      birads_score: 4,
      birads_confidence: 0.9,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      notes: "Combined CSV and folder data (findings detected)",
      created_at: new Date("2025-03-23T10:15:00"),
      images: [
        {
          image_id: "5e13057da76d03f16a4a2e9e26a7dd66",
          study_id: "c731169675259101e314d73d9e982444",
          series_id: "2139bb2aea4b30c57e395a66af603869",
          view_type: "CC",
          breast_side: "L",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:10:00"),
          image_uri:
            "assets/analysis/c731169675259101e314d73d9e982444/5e13057da76d03f16a4a2e9e26a7dd66_L_CC.png",
          created_at: new Date("2025-03-23T10:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "f769732dc985d5197ae27f0066461dd8",
          study_id: "c731169675259101e314d73d9e982444",
          series_id: "2139bb2aea4b30c57e395a66af603869",
          view_type: "CC",
          breast_side: "R",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:11:00"),
          image_uri:
            "assets/analysis/c731169675259101e314d73d9e982444/f769732dc985d5197ae27f0066461dd8_R_CC.png",
          created_at: new Date("2025-03-23T10:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "a8472717fea3274901241416ac02349e",
          study_id: "c731169675259101e314d73d9e982444",
          series_id: "2139bb2aea4b30c57e395a66af603869",
          view_type: "MLO",
          breast_side: "L",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:12:00"),
          image_uri:
            "assets/analysis/c731169675259101e314d73d9e982444/a8472717fea3274901241416ac02349e_L_MLO.png",
          created_at: new Date("2025-03-23T10:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "5990d54f07a3d63a2a23f5d3a24a027b",
          study_id: "c731169675259101e314d73d9e982444",
          series_id: "2139bb2aea4b30c57e395a66af603869",
          view_type: "MLO",
          breast_side: "R",
          breast_density: "DENSITY C",
          height: 3518,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T10:13:00"),
          image_uri:
            "assets/analysis/c731169675259101e314d73d9e982444/5990d54f07a3d63a2a23f5d3a24a027b_R_MLO.png",
          created_at: new Date("2025-03-23T10:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
      ],
      lesions: [
        {
          analysis_id: "c731169675259101e314d73d9e982444",
          xmin: 4.45317,
          xmax: 275.156006,
          ymin: 1595.280029,
          ymax: 1972.170044,
          area_pixels: 102000,
          width_mm: 27.07,
          height_mm: 37.69,
          lesion_type: "Architectural Distortion",
          lesion_birads: 4,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "c731169675259101e314d73d9e982444",
          xmin: 300,
          xmax: 500,
          ymin: 1600,
          ymax: 1800,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Architectural Distortion",
          lesion_birads: 4,
          confidence: 0.85,
          radiologist_confirmed: false,
        },
      ],
    },
    {
      id: "611b1a6fdfc6a9dc4ca9c4aa106f90be",
      patientId: "2",
      started_at: new Date("2025-03-23T11:00:00"),
      finished_at: new Date("2025-03-23T11:04:00"),
      duration_time_ms: 240000,
      birads_model_version_id: "v1.0",
      lesion_model_version_id: "v1.0",
      birads_score: 3,
      birads_confidence: 0.9,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      notes: "Merged CSV and folder structure data (all rows indicate 'No Finding')",
      created_at: new Date("2025-03-23T11:05:00"),
      images: [
        {
          image_id: "f05caee39378d5810abbe526e70406aa",
          study_id: "611b1a6fdfc6a9dc4ca9c4aa106f90be",
          series_id: "series_611_1",
          view_type: "MLO",
          breast_side: "L",
          breast_density: "DENSITY B",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:00:00"),
          image_uri:
            "assets/analysis/611b1a6fdfc6a9dc4ca9c4aa106f90be/f05caee39378d5810abbe526e70406aa_L_MLO.png",
          created_at: new Date("2025-03-23T11:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "660f77cd65c22942798e6334b1c9b4c0",
          study_id: "611b1a6fdfc6a9dc4ca9c4aa106f90be",
          series_id: "series_611_1",
          view_type: "CC",
          breast_side: "L",
          breast_density: "DENSITY B",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:01:00"),
          image_uri:
            "assets/analysis/611b1a6fdfc6a9dc4ca9c4aa106f90be/660f77cd65c22942798e6334b1c9b4c0_L_CC.png",
          created_at: new Date("2025-03-23T11:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "532e4b580647fa8d8b5b95ea77f9a80b",
          study_id: "611b1a6fdfc6a9dc4ca9c4aa106f90be",
          series_id: "series_611_1",
          view_type: "CC",
          breast_side: "R",
          breast_density: "DENSITY B",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:02:00"),
          image_uri:
            "assets/analysis/611b1a6fdfc6a9dc4ca9c4aa106f90be/532e4b580647fa8d8b5b95ea77f9a80b_R_CC.png",
          created_at: new Date("2025-03-23T11:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "1d9a76c6c247c4a3d7de092d0604ce5b",
          study_id: "611b1a6fdfc6a9dc4ca9c4aa106f90be",
          series_id: "series_611_1",
          view_type: "MLO",
          breast_side: "R",
          breast_density: "DENSITY B",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:03:00"),
          image_uri:
            "assets/analysis/611b1a6fdfc6a9dc4ca9c4aa106f90be/1d9a76c6c247c4a3d7de092d0604ce5b_R_MLO.png",
          created_at: new Date("2025-03-23T11:05:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
      ],
      lesions: [],
    },
    {
      id: "840089a7333e2984f54f4dd213500f16",
      patientId: "2",
      started_at: new Date("2025-03-23T11:10:00"),
      finished_at: new Date("2025-03-23T11:14:00"),
      duration_time_ms: 240000,
      birads_model_version_id: "v1.0",
      lesion_model_version_id: "v1.0",
      birads_score: 4,
      birads_confidence: 0.9,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      notes: "Merged CSV and folder structure data (findings detected)",
      created_at: new Date("2025-03-23T11:15:00"),
      images: [
        {
          image_id: "f3dee44f17d451479bf163107dbb9cf4",
          study_id: "840089a7333e2984f54f4dd213500f16",
          series_id: "series_840_1",
          view_type: "MLO",
          breast_side: "R",
          breast_density: "DENSITY D",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:10:00"),
          image_uri:
            "assets/analysis/840089a7333e2984f54f4dd213500f16/f3dee44f17d451479bf163107dbb9cf4_R_MLO.png",
          created_at: new Date("2025-03-23T11:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "67f49885895019878c47b21422cec4c9",
          study_id: "840089a7333e2984f54f4dd213500f16",
          series_id: "series_840_1",
          view_type: "CC",
          breast_side: "R",
          breast_density: "DENSITY D",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:11:00"),
          image_uri:
            "assets/analysis/840089a7333e2984f54f4dd213500f16/67f49885895019878c47b21422cec4c9_R_CC.png",
          created_at: new Date("2025-03-23T11:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "5954cf3018f39f13bddee31d9eb6da8f",
          study_id: "840089a7333e2984f54f4dd213500f16",
          series_id: "series_840_1",
          view_type: "MLO",
          breast_side: "L",
          breast_density: "DENSITY D",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:12:00"),
          image_uri:
            "assets/analysis/840089a7333e2984f54f4dd213500f16/5954cf3018f39f13bddee31d9eb6da8f_L_MLO.png",
          created_at: new Date("2025-03-23T11:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "29012052ad99994281e990611170b0a2",
          study_id: "840089a7333e2984f54f4dd213500f16",
          series_id: "series_840_1",
          view_type: "CC",
          breast_side: "L",
          breast_density: "DENSITY D",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:13:00"),
          image_uri:
            "assets/analysis/840089a7333e2984f54f4dd213500f16/29012052ad99994281e990611170b0a2_L_CC.png",
          created_at: new Date("2025-03-23T11:15:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
      ],
      lesions: [
        {
          analysis_id: "840089a7333e2984f54f4dd213500f16",
          xmin: 500,
          xmax: 700,
          ymin: 600,
          ymax: 800,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 4,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "840089a7333e2984f54f4dd213500f16",
          xmin: 520,
          xmax: 720,
          ymin: 620,
          ymax: 820,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 4,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "840089a7333e2984f54f4dd213500f16",
          xmin: 540,
          xmax: 740,
          ymin: 640,
          ymax: 840,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 4,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "840089a7333e2984f54f4dd213500f16",
          xmin: 560,
          xmax: 760,
          ymin: 660,
          ymax: 860,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 4,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
      ],
    },
    {
      id: "5e738b21ece161aa495b59fee9c11455",
      patientId: "3",
      started_at: new Date("2025-03-23T11:20:00"),
      finished_at: new Date("2025-03-23T11:24:00"),
      duration_time_ms: 240000,
      birads_model_version_id: "v1.0",
      lesion_model_version_id: "v1.0",
      birads_score: 3,
      birads_confidence: 0.9,
      radiologist_reviewed: false,
      radiologist_birads_score: 0,
      notes: "Merged CSV and folder structure data (findings detected)",
      created_at: new Date("2025-03-23T11:25:00"),
      images: [
        {
          image_id: "ffe25766ac37ab145ae7f0bd78665f81",
          study_id: "5e738b21ece161aa495b59fee9c11455",
          series_id: "series_5e73_1",
          view_type: "MLO",
          breast_side: "L",
          breast_density: "DENSITY C",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:20:00"),
          image_uri:
            "assets/analysis/5e738b21ece161aa495b59fee9c11455/ffe25766ac37ab145ae7f0bd78665f81_L_MLO.png",
          created_at: new Date("2025-03-23T11:25:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "cd685d87b728c5282f984bfdf424162b",
          study_id: "5e738b21ece161aa495b59fee9c11455",
          series_id: "series_5e73_1",
          view_type: "MLO",
          breast_side: "R",
          breast_density: "DENSITY C",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:21:00"),
          image_uri:
            "assets/analysis/5e738b21ece161aa495b59fee9c11455/cd685d87b728c5282f984bfdf424162b_R_MLO.png",
          created_at: new Date("2025-03-23T11:25:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "93ed0aed7d5768f948fcc46861b4123e",
          study_id: "5e738b21ece161aa495b59fee9c11455",
          series_id: "series_5e73_1",
          view_type: "CC",
          breast_side: "L",
          breast_density: "DENSITY C",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:22:00"),
          image_uri:
            "assets/analysis/5e738b21ece161aa495b59fee9c11455/93ed0aed7d5768f948fcc46861b4123e_L_CC.png",
          created_at: new Date("2025-03-23T11:25:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
        {
          image_id: "301af7f8978640e4dd362075aba35040",
          study_id: "5e738b21ece161aa495b59fee9c11455",
          series_id: "series_5e73_1",
          view_type: "CC",
          breast_side: "R",
          breast_density: "DENSITY C",
          height: 3500,
          width: 2800,
          acquisition_timestamp: new Date("2025-03-23T11:23:00"),
          image_uri:
            "assets/analysis/5e738b21ece161aa495b59fee9c11455/301af7f8978640e4dd362075aba35040_R_CC.png",
          created_at: new Date("2025-03-23T11:25:00"),
          pixel_spacing_x: 0.1,
          pixel_spacing_y: 0.1,
        },
      ],
      lesions: [
        {
          analysis_id: "5e738b21ece161aa495b59fee9c11455",
          xmin: 600,
          xmax: 800,
          ymin: 700,
          ymax: 900,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "5e738b21ece161aa495b59fee9c11455",
          xmin: 620,
          xmax: 820,
          ymin: 720,
          ymax: 920,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "5e738b21ece161aa495b59fee9c11455",
          xmin: 640,
          xmax: 840,
          ymin: 740,
          ymax: 940,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
        {
          analysis_id: "5e738b21ece161aa495b59fee9c11455",
          xmin: 660,
          xmax: 860,
          ymin: 760,
          ymax: 960,
          area_pixels: 40000,
          width_mm: 20,
          height_mm: 20,
          lesion_type: "Mass",
          lesion_birads: 3,
          confidence: 0.9,
          radiologist_confirmed: false,
        },
      ],
    },
  ];;

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
