import { Component, OnInit } from '@angular/core';
import { Famille } from '../model/famille.model';
import { ParfumService } from '../services/parfum.service';

@Component({
  selector: 'app-liste-familles',
  templateUrl: './liste-familles.component.html'
})
export class ListeFamillesComponent implements OnInit {
    familles! : Famille[];
    updatedFam:Famille = {"idFam":0,"nomFam":""};
    ajout:boolean=true;

    constructor(private parfumService : ParfumService) { }
    ngOnInit(): void {
    this.parfumService.listeFamilles().
    subscribe(fams => {this.familles = fams._embedded.familles;
    console.log(fams);
    });
    }
      familleUpdated(fam:Famille){
        console.log("Fam updated event",fam);
        this.parfumService.ajouterFamille(fam).
         subscribe( ()=> this.chargerFamilles());
        }
    
        chargerFamilles(){
          this.parfumService.listeFamilles().
          subscribe(fams => {this.familles = fams._embedded.familles;
          console.log(fams);
          });
          }
        
            updateFam(fam:Famille) {
              this.updatedFam=fam;
              this.ajout=false;
              }
}


   

        
          

