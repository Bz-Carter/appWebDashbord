import { Category } from './category';
import { Photo } from './photo';
import { User } from './user';
import { Video } from './video';

export interface Media {
  id: number;
  name: string;
  description: string;
  image: string;
  category: Category;
  photos: Photo[];
  videos: Video[];
  owner: User;
  created: Date;
}
