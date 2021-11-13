import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  lastPage: number;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.videoService.all().subscribe((res: Response) => {
      this.videos = res.data;
      
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.videoService.delete(id).subscribe((res) => {
        this.videos = this.videos.filter((el) => el.id !== id);
      });
    }
  }
}
