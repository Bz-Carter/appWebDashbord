import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/interfaces/media';
import { Response } from 'src/app/interfaces/response';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {

  medias: Media[] = [];
  lastPage: number;

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(currentPage: number = 1) {
    this.mediaService.all(currentPage).subscribe(
      (res: Response) => {
        this.medias = res.data;
        this.lastPage = res.meta.last_page;
      }
    );
  }

  delete(id: number) {
    if(confirm('Are you sure you want to delete this record?')){
      this.mediaService.delete(id).subscribe(
        res => {
          this.medias = this.medias.filter(el => el.id !== id );
        }
      );
    }
  }

}
