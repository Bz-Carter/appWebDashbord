import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/interfaces/photo';
import { Response } from 'src/app/interfaces/response';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos: Photo[] = [];
  lastPage: number;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(currentPage: number = 1) {
    this.photoService.all(currentPage).subscribe(
      (res: Response) => {
        this.photos = res.data;
        this.lastPage = res.meta.last_page;
      }
    );
  }

  delete(id: number) {
    if(confirm('Are you sure you want to delete this record?')){
      this.photoService.delete(id).subscribe(
        res => {
          this.photos = this.photos.filter(el => el.id !== id );
        }
      );
    }
  }

}
