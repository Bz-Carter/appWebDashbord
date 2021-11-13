import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from 'src/app/interfaces/calendar';
import { Response } from 'src/app/interfaces/response';
import { CalendarService } from "src/app/services/calendar.service";
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {
  annonce: Calendar;
  form: FormGroup;

  constructor(
    private imageService: ImageService, 
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      start: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.calendarService.get(params.id).subscribe((res: Response) => {
        this.annonce = res.data;

        this.form.patchValue({
          image: this.annonce.image,
          title: this.annonce.title,
          start: this.annonce.start,
          description: this.annonce.description,
        });
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      const data = {
        image: formData.image,
        title: formData.title,
        start: formData.start,
        description: formData.description,
      };
      this.calendarService.update(this.annonce.id, data).subscribe((res) => {
        this.router.navigate(['/calendar']);
      }); 
    }
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
