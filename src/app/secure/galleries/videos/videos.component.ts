import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  videos: Video[] = [];
  lastPage: number;
  safeSrc: SafeResourceUrl;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk");
  }

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
