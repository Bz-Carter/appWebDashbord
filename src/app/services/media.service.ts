import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class MediaService extends RestService {
  endpoint(): string {
    return 'medias';
  }
}
