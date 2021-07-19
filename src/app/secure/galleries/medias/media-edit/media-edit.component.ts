import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { Category } from 'src/app/interfaces/category';
import { Media } from 'src/app/interfaces/media';
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
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.css']
})
export class MediaEditComponent implements OnInit {

  medias: Media;
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
    private mediaService: MediaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      image: '',
      name: '',
      description: '',
      category: '',
      photos: this.formBuilder.array([]),
      videos: this.formBuilder.array([])
    });

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

    this.route.params.subscribe(
      params => {
        this.mediaService.get(params.id).subscribe(
          (res: Response) => {
            this.medias = res.data;
            let values = this.videos.map((p: Video) => {
              let selected = this.medias.videos
              .filter((mediaVideo: Video) => mediaVideo.id === p.id).length > 0;
              
              return {
                value: selected,
                id: p.id
              }
            });

            let values2 = this.photos.map((p: Photo) => {
              let selected = this.medias.photos
              .filter((mediaPhoto: Photo) => mediaPhoto.id === p.id).length > 0;
              
              return {
                value: selected,
                id: p.id
              }
            });

            this.form.patchValue({
              name: this.medias.name,
              description: this.medias.description,
              category: this.medias.category,
              image: this.medias.image,
              videos: values,
              photos: values2,
            });
          }
        );
      }
    );
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
    this.mediaService.update(this.medias.id, data).subscribe(
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
