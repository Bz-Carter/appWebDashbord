import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/interfaces/response';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';
declare let $ :any;

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  form: FormGroup;
  video: Video;


  constructor(
    private videosService: VideoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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



    this.form = this.formBuilder.group({
      name: '',
      link: '',
    });

    this.route.params.subscribe(
      params => {
        this.videosService.get(params.id).subscribe(
          (res:Response) => {
            this.video = res.data
            this.form.patchValue({
              name: this.video.name,
              link: this.video.link,
            });
          }
        )
      }
    );

  }

  submit(){
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      link: formData.link,
    };

    this.videosService.update(this.video.id, data).subscribe(
      res => {
        this.router.navigate(['/galleries/videos']);
      }
    );

  }

}
