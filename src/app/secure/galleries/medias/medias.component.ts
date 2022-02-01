import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/interfaces/type';
import { Media } from 'src/app/interfaces/media';
import { Response } from 'src/app/interfaces/response';
import { TypeService } from 'src/app/services/type.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css'],
})
export class MediasComponent implements OnInit {
  types: Type[] = [];
  events: Media[] = [];

  constructor(
    private mediaService: MediaService,
    private typeService: TypeService,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {

    this.typeService.all().subscribe((res: Response) => {
      this.types = res.data;
    });

    this.mediaService.all().subscribe((res: Response) => {
      this.events = res.data;
      this.events.forEach((e: any) => {
        this.types.forEach((t: any) => {
          if (e.type === t.id) {
            e.type = t.name;
          }
        });
      });
      console.log(this.events);
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.mediaService.delete(id).subscribe((res) => {
        this.events = this.events.filter((el) => el.id !== id);
      });
    }
  }
}
