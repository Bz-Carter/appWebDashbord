import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Media } from 'src/app/interfaces/media';
import { Response } from 'src/app/interfaces/response';
import { CategoryService } from 'src/app/services/category.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css'],
})
export class MediasComponent implements OnInit {
  categories: Category[] = [];
  events: Media[] = [];

  constructor(
    private mediaService: MediaService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {

    this.categoryService.all().subscribe((res: Response) => {
      this.categories = res.data;
    });

    this.mediaService.all().subscribe((res: Response) => {
      this.events = res.data;
      this.events.forEach((a: any) => {
        this.categories.forEach((c: any) => {
          if (a.category === c.id) {
            a.category = c.name;
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
