import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { VideoService } from 'src/app/services/video.service';
declare let $: any;

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css'],
})
export class VideoCreateComponent implements OnInit {
  form: FormGroup;
  owner = Auth.user.id;

  constructor(
    private videoService: VideoService,
    private formBuilder: FormBuilder,
    private router: Router
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

    this.form = this.formBuilder.group({
      name: '',
      link: '',
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      link: formData.link,
      owner: this.owner,
    };
    this.videoService.create(data).subscribe((res) => {
      this.router.navigate(['/galleries/videos']);
    });
  }
}
