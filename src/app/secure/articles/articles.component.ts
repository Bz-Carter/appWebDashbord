import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { Response } from 'src/app/interfaces/response';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  lastPage: number;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(currentPage: number = 1) {
    this.articleService.all(currentPage).subscribe((res: Response) => {
      this.articles = res.data;
      this.lastPage = res.meta.last_page;
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.articleService.delete(id).subscribe((res) => {
        this.articles = this.articles.filter((el) => el.id !== id);
      });
    }
  }
}
