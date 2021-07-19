import { User } from './user';

export interface Video {
  id: number;
  name: string;
  link: string;
  owner: User;
  created: Date;
}
