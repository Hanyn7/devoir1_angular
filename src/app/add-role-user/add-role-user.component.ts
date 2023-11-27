import { Component } from '@angular/core';
import { ParfumService } from '../services/parfum.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/User.model';
import { Role } from '../model/Role.model';
@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',

})
export class AddRoleUserComponent {
  constructor(private parfumService: ParfumService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }
  isDisabled: boolean = true;
  User!: User
  Users!: User[]
  roles!: any
  Role!: Role
  idOfRole!: Role
  NewRole!: Role
  RoleToRemove: Role = new Role();
  isRoleAdded: boolean = false;


  ngOnInit(): void {
    this.parfumService.listeUser().subscribe(data => {
      this.Users = data;
      console.log(data);
    }
      ,
      err => {
        console.log(err);
      }
    );
    this.authService.consulterUser(this.activatedRoute.snapshot.params['id']).subscribe((user) => {
      this.User = user;
      console.log(this.User);
    }
    );
    this.parfumService.getAllRoles().subscribe(data => {
      this.roles = data;
      console.log(data);
    },
      err => {
        console.log(err);
      }
    );
  }
  addRoleToUser() {
    console.log(this.idOfRole);
    console.log(this.activatedRoute.snapshot.params['id']);
    let hasRole = false;
    for (let r of this.User.roles) {
      if (r.role_id === this.idOfRole.role_id) {
        hasRole = true;
        break;
      }
    }
    if (!hasRole) {
      this.authService.AddRoleForUser(this.activatedRoute.snapshot.params['id'], this.idOfRole).subscribe((user) => {
        console.log(user);
        this.User = user;
        this.isRoleAdded = true; 
      });
    }
  }

  removeRoleFromUsers(id: number) {
    console.log("id of the role" + id)
    this.parfumService.findRoleById(id).subscribe((role) => {
      this.Role = role;
      console.log("the role" + role.role_id);
      console.log(this.activatedRoute.snapshot.params['id'])
      this.authService.removeRoleFromUser(this.activatedRoute.snapshot.params['id'], this.Role).subscribe((user) => {
        console.log(user);
        this.User = user;
      });
    }
    );
  }






}