import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.css']
})
export class TypeCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private typeService: TypeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
    };
    this.typeService.create(data).subscribe((res) => {
      this.router.navigate(['/types']);
    });
  }

}
