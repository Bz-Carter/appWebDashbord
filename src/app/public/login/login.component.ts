import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
declare let $, md: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    $(document).ready(function () {
      md.checkFullPageBackgroundImage();
      setTimeout(function () {
        // after 1000 ms we add the class animated to the login/register card
        $('.card').removeClass('card-hidden');
      }, 700);
    });

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/']));
    }
    
  }
}
