import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { TagsComponent } from './tags/tags.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { TagCreateComponent } from './tags/tag-create/tag-create.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PhotosComponent } from './galleries/photos/photos.component';
import { VideosComponent } from './galleries/videos/videos.component';
import { MediasComponent } from './galleries/medias/medias.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { PhotoCreateComponent } from './galleries/photos/photo-create/photo-create.component';
import { PhotoEditComponent } from './galleries/photos/photo-edit/photo-edit.component';
import { VideoEditComponent } from './galleries/videos/video-edit/video-edit.component';
import { VideoCreateComponent } from './galleries/videos/video-create/video-create.component';
import { MediaCreateComponent } from './galleries/medias/media-create/media-create.component';
import { MediaEditComponent } from './galleries/medias/media-edit/media-edit.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarsComponent } from './calendars/calendars.component';
import { CalendarCreateComponent } from './calendars/calendar-create/calendar-create.component';
import { CalendarEditComponent } from './calendars/calendar-edit/calendar-edit.component';

FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin
]);

@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    MenuComponent,
    DashboardComponent,
    UsersComponent,
    FooterComponent,
    ProfileComponent,
    UserCreateComponent,
    UserEditComponent,
    RolesComponent,
    RoleEditComponent,
    RoleCreateComponent,
    ArticlesComponent,
    CategoriesComponent,
    TagsComponent,
    SettingsComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    TagEditComponent,
    TagCreateComponent,
    PaginatorComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ImageUploadComponent,
    PhotosComponent,
    VideosComponent,
    MediasComponent,
    GalleriesComponent,
    PhotoCreateComponent,
    PhotoEditComponent,
    VideoEditComponent,
    VideoCreateComponent,
    MediaCreateComponent,
    MediaEditComponent,
    CalendarsComponent,
    CalendarCreateComponent,
    CalendarEditComponent,
  ],
  exports: [SecureComponent],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule, 
    FullCalendarModule,
  ],
})
export class SecureModule {}
