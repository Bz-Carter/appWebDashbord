import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];
  currentPage = 1;
  lastPage: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.userService.all(this.currentPage).subscribe((res: Response) => {
      this.users = res.data;
      this.lastPage = res.meta.last_page;
    });
  }

  prev() {
    if (this.currentPage == 1) return;
    this.currentPage--;
    this.refresh();
  }

  next() {
    if (this.currentPage == this.lastPage) return;
    this.currentPage++;
    this.refresh();
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe((res) => {
        this.users = this.users.filter((el) => el.id !== id);
      });
    }
  }
}
