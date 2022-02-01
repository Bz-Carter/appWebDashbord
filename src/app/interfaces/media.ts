import { Type } from './type';
import { Photo } from './photo';
import { User } from './user';
import { Video } from './video';

export interface Media {
  id: number;
  name: string;
  description: string;
  image: string;
  type: Type;
  photos: Photo[];
  videos: Video[];
  owner: User;
  created: Date;
}
