import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class VideoService extends RestService {
  endpoint = `${environment.api}/videos`;
}
