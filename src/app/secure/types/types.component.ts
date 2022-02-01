import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/interfaces/type';
import { TypeService } from 'src/app/services/type.service';
import { Response } from 'src/app/interfaces/response';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  types: Type[] = [];

  constructor(private typeService: TypeService) {}

  ngOnInit(): void {
    this.typeService.all().subscribe((res: Response) => {
      this.types = res.data;
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this type?')) {
      this.typeService.delete(id).subscribe((res) => {
        this.types = this.types.filter((el) => el.id !== id);
      });
    }
  }

}
