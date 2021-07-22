import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends RestService {
  endpoint = `${environment.api}/tags`;
}
