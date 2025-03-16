import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { PatientComponent } from './components/patient/patient.component';
import { AnalysisComponent } from './components/analysis/analysis.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'patient/:id', component: PatientComponent },
  { path: 'patient/:id/analysis/:id', component: AnalysisComponent }
];
