import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from 'src/app/interfaces/calendar';
import { Response } from 'src/app/interfaces/response';
import { CalendarService } from "src/app/services/calendar.service";
import { ImageService } from 'src/app/services/image.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.css']
})
export class CalendarEditComponent implements OnInit {
  annonce: Calendar;
  form: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://localhost:8000/api/upload',
    // upload: (files: FileList) => { ... },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

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
      end: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.calendarService.get(params.id).subscribe((res: Response) => {
        this.annonce = res.data;

        this.form.patchValue({
          image: this.annonce.image,
          title: this.annonce.title,
          start: this.annonce.start,
          end: this.annonce.end,
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
        end: formData.end,
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
