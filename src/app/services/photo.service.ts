import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService extends RestService {
  endpoint = `${environment.api}/photos`;
}
