import { Component } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  files: File[] = [];

  constructor(
    private uploadService: UploadService,
    private snackBar: MatSnackBar
  ) {}

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.files = Array.from(target.files);
    }
  }

  onSubmit(): void {
    if (this.files.length !== 4) {
      this.snackBar.open('Please upload exactly 4 images', 'Close', { duration: 3000 });
      return;
    }

    this.uploadService.uploadMammographyImages(this.files).subscribe({
      next: (res) => {
        this.snackBar.open('Image analysis started', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Upload failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }
}