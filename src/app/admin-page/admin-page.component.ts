import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/User.model';
import { Role } from '../model/Role.model';
import { ParfumService } from '../services/parfum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent implements OnInit{
  users? : User[];
  roles?: Role[];

  constructor( private parfumService: ParfumService ,private a:AuthService,private router: Router) {}

  ngOnInit(): void {
    this.chargerUsers();
    console.log(this.users);

  }

  chargerUsers(){
    this.parfumService.listeUser().
    subscribe((users:any)=>{
    console.log(users);
    this.users=users;
    });
    }

    deleteUser(id: number) {
      const confirmed = confirm("voulez vous vraiment supprimer cette user!!");
      if (confirmed) {
        this.a.deleteUser(id).subscribe(
          (response) => {
            console.log(response); 
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/admin-page']);
          },
          (err) => {
            console.log(err);
          }
        );
      }}

}





