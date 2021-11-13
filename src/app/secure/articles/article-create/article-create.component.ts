import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { Category } from 'src/app/interfaces/category';
import { Response } from 'src/app/interfaces/response';
import { Tag } from 'src/app/interfaces/tag';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { TagService } from 'src/app/services/tag.service';
declare let $: any;

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  categories: Category[] = [];
  tags: Tag[] = [];
  form: FormGroup;
  owner = Auth.user.id;

  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    function setFormValidation(id) {
      $(id).validate({
        highlight: function (element) {
          $(element)
            .closest('.form-group')
            .removeClass('has-success')
            .addClass('has-danger');
          $(element)
            .closest('.form-check')
            .removeClass('has-success')
            .addClass('has-danger');
        },
        success: function (element) {
          $(element)
            .closest('.form-group')
            .removeClass('has-danger')
            .addClass('has-success');
          $(element)
            .closest('.form-check')
            .removeClass('has-danger')
            .addClass('has-success');
        },
        errorPlacement: function (error, element) {
          $(element).closest('.form-group').append(error);
        },
      });
    }

    $(document).ready(function () {
      setFormValidation('#TypeValidation');
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
      }, 100);
    });

    this.form = this.formBuilder.group({
      image: '',
      title: '',
      description: '',
      body:'',
      category: '',
      tags: this.formBuilder.array([]),
    });

    this.categoryService.all().subscribe((res: Response) => {
      this.categories = res.data;
    });

    this.tagService.all().subscribe((res: Response) => {
      this.tags = res.data;
      this.tags.forEach((p: Tag) => {
        this.tagArray.push(
          this.formBuilder.group({
            value: false,
            id: p.id,
          })
        );
      });
    });
  }

  get tagArray() {
    return this.form.get('tags') as FormArray;
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      image: formData.image,
      title: formData.title,
      description: formData.description,
      body: formData.body,
      category: formData.category,
      tags: formData.tags.filter((p) => p.value === true).map((p) => p.id),
      owner: this.owner,
    };
    this.articleService.create(data).subscribe((res) => {
      this.router.navigate(['/articles']);
    });
  }

  upload(files: FileList) {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);

    this.imageService.upload(data).subscribe((res: any) => {
      this.form.patchValue({
        image: res.url,
      });
    });
  }
}
