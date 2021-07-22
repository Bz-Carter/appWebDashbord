import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { UsersComponent } from './secure/users/users.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { UserCreateComponent } from './secure/users/user-create/user-create.component';
import { UserEditComponent } from './secure/users/user-edit/user-edit.component';
import { RolesComponent } from './secure/roles/roles.component';
import { RoleCreateComponent } from './secure/roles/role-create/role-create.component';
import { RoleEditComponent } from './secure/roles/role-edit/role-edit.component';
import { CategoriesComponent } from './secure/categories/categories.component';
import { CategoryEditComponent } from './secure/categories/category-edit/category-edit.component';
import { CategoryCreateComponent } from './secure/categories/category-create/category-create.component';
import { TagsComponent } from './secure/tags/tags.component';
import { TagCreateComponent } from './secure/tags/tag-create/tag-create.component';
import { TagEditComponent } from './secure/tags/tag-edit/tag-edit.component';
import { ArticlesComponent } from './secure/articles/articles.component';
import { ArticleCreateComponent } from './secure/articles/article-create/article-create.component';
import { ArticleEditComponent } from './secure/articles/article-edit/article-edit.component';
import { GalleriesComponent } from './secure/galleries/galleries.component';
import { PhotosComponent } from './secure/galleries/photos/photos.component';
import { VideosComponent } from './secure/galleries/videos/videos.component';
import { MediasComponent } from './secure/galleries/medias/medias.component';
import { PhotoCreateComponent } from './secure/galleries/photos/photo-create/photo-create.component';
import { PhotoEditComponent } from './secure/galleries/photos/photo-edit/photo-edit.component';
import { VideoCreateComponent } from './secure/galleries/videos/video-create/video-create.component';
import { VideoEditComponent } from './secure/galleries/videos/video-edit/video-edit.component';
import { MediaEditComponent } from './secure/galleries/medias/media-edit/media-edit.component';
import { MediaCreateComponent } from './secure/galleries/medias/media-create/media-create.component';
import { SettingsComponent } from './secure/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/:id/edit', component: UserEditComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/create', component: RoleCreateComponent },
      { path: 'roles/:id/edit', component: RoleEditComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/create', component: CategoryCreateComponent },
      { path: 'categories/:id/edit', component: CategoryEditComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'tags/create', component: TagCreateComponent },
      { path: 'tags/:id/edit', component: TagEditComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'articles/create', component: ArticleCreateComponent },
      { path: 'articles/:id/edit', component: ArticleEditComponent },
      { path: 'galleries/photos', component: PhotosComponent },
      { path: 'galleries/photos/create', component: PhotoCreateComponent },
      { path: 'galleries/photo/:id/edit', component: PhotoEditComponent },
      { path: 'galleries/videos', component: VideosComponent },
      { path: 'galleries/videos/create', component: VideoCreateComponent },
      { path: 'galleries/videos/:id/edit', component: VideoEditComponent },
      { path: 'galleries/medias', component: MediasComponent },
      { path: 'galleries/medias/create', component: MediaCreateComponent },
      { path: 'galleries/medias/:id/edit', component: MediaEditComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

