import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Response } from 'src/app/interfaces/response';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/interfaces/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/interfaces/role';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
})
export class RoleEditComponent implements OnInit {
  permissions: Permission[] = [];
  form: FormGroup;
  role: Role;

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([]),
    });

    this.permissionService.all().subscribe((res: Response) => {
      this.permissions = res.data;
      this.permissions.forEach((p: Permission) => {
        this.permissionArray.push(
          this.formBuilder.group({
            value: false,
            id: p.id,
          })
        );
      });
    });

    this.route.params.subscribe((params) => {
      this.roleService.get(params.id).subscribe((res: Response) => {
        this.role = res.data;
        let values = this.permissions.map((p: Permission) => {
          let selected =
            this.role.permissions.filter(
              (rolePermission: Permission) => rolePermission.id === p.id
            ).length > 0;

          return {
            value: selected,
            id: p.id,
          };
        });

        console.log(values); // boucle tags

        this.form.patchValue({
          name: this.role.name,
          permissions: values,
        });
      });
    });
  }

  get permissionArray() {
    return this.form.get('permissions') as FormArray;
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((p) => p.value === true)
        .map((p) => p.id),
    };

    this.roleService.update(this.role.id, data).subscribe((res) => {
      this.router.navigate(['/roles']);
    });
  }
}
