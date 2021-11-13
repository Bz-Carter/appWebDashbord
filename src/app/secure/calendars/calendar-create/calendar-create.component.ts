import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-calendar-create',
  templateUrl: './calendar-create.component.html',
  styleUrls: ['./calendar-create.component.css']
})
export class CalendarCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private imageService: ImageService,
    private calendarService: CalendarService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      start: ['', Validators.required],
      description: '',
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
      this.calendarService.create(data).subscribe((res) => {
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
