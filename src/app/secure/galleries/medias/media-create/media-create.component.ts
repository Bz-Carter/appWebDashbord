import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { Category } from 'src/app/interfaces/category';
import { Photo } from 'src/app/interfaces/photo';
import { Response } from 'src/app/interfaces/response';
import { Video } from 'src/app/interfaces/video';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { MediaService } from 'src/app/services/media.service';
import { PhotoService } from 'src/app/services/photo.service';
import { VideoService } from 'src/app/services/video.service';
declare let $ :any;


@Component({
  selector: 'app-media-create',
  templateUrl: './media-create.component.html',
  styleUrls: ['./media-create.component.css']
})
export class MediaCreateComponent implements OnInit {

  categories: Category[] = [];
  photos: Photo[] = [];
  videos: Video[] = [];
  form: FormGroup;
  owner = Auth.user.id;

  constructor(
    private imageService: ImageService,
    private categoryService: CategoryService,
    private photoService: PhotoService,
    private videoService: VideoService,
    private mediaservice: MediaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    function setFormValidation(id) {
      $(id).validate({
        highlight: function(element) {
          $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
          $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
        },
        success: function(element) {
          $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
          $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');
        },
        errorPlacement: function(error, element) {
          $(element).closest('.form-group').append(error);
        },
      });
    }

    $(document).ready(function() {
      setFormValidation('#TypeValidation');
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh');
     }, 100);
    });

    this.form = this.formBuilder.group({
      image: '',
      name: '',
      description: '',
      category: '',
      photos: this.formBuilder.array([]),
      videos: this.formBuilder.array([])
    });
    this.photoService.all().subscribe(
      (res: Response) => {
        this.photos = res.data;
        this.photos.forEach((p: Photo) => {
          this.photoArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          )
        });
      }
    );
    this.videoService.all().subscribe(
      (res: Response) => {
        this.videos = res.data;
        this.videos.forEach((p: Video) => {
          this.videoArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          )
        });
      }
    );
    this.categoryService.all().subscribe(
      (res: Response) =>{
        this.categories = res.data;
    });
  }

  get photoArray(){
    return this.form.get('photos') as FormArray;
  }

  get videoArray(){
    return this.form.get('videos') as FormArray;
  }

  submit(){
    const formData = this.form.getRawValue();

    const data = {
      image: formData.image,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      photos: formData.photos.filter(p => p.value === true).map(p => p.id),
      videos: formData.videos.filter(p => p.value === true).map(p => p.id),
      owner: this.owner
    };
    this.mediaservice.create(data).subscribe(
      res => {
        this.router.navigate(['/galleries/medias']);
      }
    );

  }

  upload(files: FileList) {
    const file = files.item(0);

    const data = new FormData();
    data.append('image', file);
    
    this.imageService.upload(data).subscribe(
      (res: any) => {
        this.form.patchValue({
          image: res.url
        });
      }
    );
  }

}
