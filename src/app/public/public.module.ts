import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    PublicComponent,
    MenuComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class PublicModule {}
