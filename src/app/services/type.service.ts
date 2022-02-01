import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class TypeService extends RestService {
  endpoint(): string {
    return 'types';
  }
}
