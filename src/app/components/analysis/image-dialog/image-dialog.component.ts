import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisImage } from '../../../services/analysis.service';

@Component({
  selector: 'app-image-dialog',
  imports: [],
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.scss'
})
export class ImageDialogComponent {
  zoom = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AnalysisImage) {}

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY;
    if (delta < 0) {
      this.zoom += 0.1;
    } else {
      this.zoom = Math.max(1, this.zoom - 0.1);
    }
    const img = (event.target as HTMLElement);
    img.style.transform = `scale(${this.zoom})`;
  }
}
