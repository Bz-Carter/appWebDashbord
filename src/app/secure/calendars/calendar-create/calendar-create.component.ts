import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';
import { ImageService } from 'src/app/services/image.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-calendar-create',
  templateUrl: './calendar-create.component.html',
  styleUrls: ['./calendar-create.component.css']
})
export class CalendarCreateComponent implements OnInit {

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
    uploadUrl: 'v1/image',
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
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
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
        end: formData.end,
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
