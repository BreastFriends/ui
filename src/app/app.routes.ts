import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { PatientComponent } from './components/patient/patient.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'patient/new', component: NewPatientComponent, canActivate: [AuthGuard] },
  { path: 'patient/:patientId', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'patient/:patientId/analysis/new', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'patient/:patientId/analysis/:analysisId', component: AnalysisComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];
