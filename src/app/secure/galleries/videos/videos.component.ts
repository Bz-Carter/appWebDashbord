import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos: Video[] = [];
  lastPage: number;


  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(currentPage: number = 1) {
    this.videoService.all(currentPage).subscribe(
      (res: Response) => {
        this.videos = res.data;
        this.lastPage = res.meta.last_page;
      }
    );
  }

  delete(id: number) {
    if(confirm('Are you sure you want to delete this record?')){
      this.videoService.delete(id).subscribe(
        res => {
          this.videos = this.videos.filter(el => el.id !== id );
        }
      );
    }
  }

}
