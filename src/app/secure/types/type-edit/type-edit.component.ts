import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/interfaces/type';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.css']
})
export class TypeEditComponent implements OnInit {

  form: FormGroup;
  type: Type;

  constructor(
    private typeService: TypeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });

    this.route.params.subscribe((params) => {
      this.typeService.get(params.id).subscribe((res: Response) => {
        this.type = res.data;

        this.form.patchValue({
          name: this.type.name,
        });
      });
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
    };

    this.typeService.update(this.type.id, data).subscribe((res) => {
      this.router.navigate(['/types']);
    });
  }

}
