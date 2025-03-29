import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, MatCard, MatButton],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  // Store all file objects and preview URLs
  files: any[] = [];
  leftCC: any[] = [];
  leftMLO: any[] = [];
  rightCC: any[] = [];
  rightMLO: any[] = [];
  patientId!: string | null;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientService.getPatients().subscribe(patients => {
      if (this.patientId) {
        const found = patients.find(p => p.id === this.patientId);
        if (!found) {
          this.snackBar.open('Patient not found', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        }
      }
    });
  }

  onFileChange(event: any) {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    // Clear previous files and categories
    this.files = [];
    this.leftCC = [];
    this.leftMLO = [];
    this.rightCC = [];
    this.rightMLO = [];

    // Process each selected file
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileObj = {
            file: file,
            name: file.name,
            previewUrl: URL.createObjectURL(file)
        };

        this.files.push(fileObj);

        const filename = file.name.toUpperCase();

        // Check for side and view dynamically
        const isLeft = filename.includes('_L_');
        const isRight = filename.includes('_R_');
        const isCC = filename.includes('CC');
        const isMLO = filename.includes('MLO') || filename.includes('ML');

        if (isLeft) {
            if (isCC) {
                this.leftCC.push(fileObj);
            } else if (isMLO) {
                this.leftMLO.push(fileObj);
            }
        } else if (isRight) {
            if (isCC) {
                this.rightCC.push(fileObj);
            } else if (isMLO) {
                this.rightMLO.push(fileObj);
            }
        }
    }
}

  onSubmit() {
    if (this.files.length !== 4) {
      alert('Please select exactly 4 images.');
      return;
    }
    console.log('Files ready for upload:', this.files);
    this.snackBar.open('Analysis started', 'Close', { duration: 3000 });
    this.router.navigate(['/patient', this.patientId]);
  }
}
