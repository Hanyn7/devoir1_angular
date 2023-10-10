import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Image } from '../model/image.model';

import { ParfumService } from '../services/parfum.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-parfums',
  templateUrl: './parfums.component.html'
})
export class ParfumsComponent implements OnInit  {

  parfums? :  Parfum[] ;

  constructor(private parfumService: ParfumService, public authService: AuthService ) {
    }


    ngOnInit(): void {
      this.chargerParfums();
      }

      apiurl:string='http://localhost:8080/parfums/api';
      chargerParfums(){
this.parfumService.listeParfum().subscribe(parfs => {
this.parfums = parfs;
});
}


     /*chargerParfums(){
        this.parfumService.listeParfum().subscribe(prods => {
        this.parfums = prods;
        this.parfums.forEach((prod) => {
        this.parfumService
        .loadImage(prod.image.idImage)
        .subscribe((img: Image) => {
        prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
        });
        });
        }*/
        /*chargerParfums(){
          this.parfumService.listeParfum().subscribe(parfs => {
          this.parfums = parfs;
          this.parfums.forEach((parf) => {
            parf.imageStr = 'data:' + parf.images[0].type + ';base64,' +
            parf.images[0].image;
          });
          });
          }*/
        
      
      supprimerParfum(p: Parfum)
      {
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.parfumService.supprimerParfum(p.idParfum).subscribe(() => {
      console.log("Parfum supprimé");
      this.chargerParfums();
      });
      }
    
        }

