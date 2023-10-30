import { Component } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Famille } from '../model/famille.model';
import { ParfumService } from '../services/parfum.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-recherche-par-famille',
  templateUrl: './recherche-par-famille.component.html'
})
export class RechercheParFamilleComponent {
  IdFamille! : number;
  familles! : Famille[];
  currentParfum = new Parfum();
  updatedFamId! : number;
  parfums! : Parfum[];
  noPerfumesFound: boolean = false;

  constructor(private parfumService : ParfumService, private router :Router) { }

  apiURL: string = 'http://localhost:8080/parfums/api';

  ngOnInit(): void {
    this.chargerParfums();
    this.parfumService.listeFamilles().
    subscribe(fams => {this.familles = fams._embedded.familles;
    console.log(fams);
    });
    }
    chargerParfums(){
      this.parfumService.listeParfum().subscribe(parfs => {
      this.parfums = parfs;
      });
      }
      
      onChange() {
        this.parfumService.rechercherParFamille(this.IdFamille).subscribe((parfs) => {
          this.parfums = parfs;
          
          if (this.parfums.length === 0) {
            
            this.noPerfumesFound = true;
          } else {
            this.noPerfumesFound = false;
          }
        });
      }
      
      updateParfum() {
        this.currentParfum.famille = this.familles.find(fam => fam.idFam ==
        this.updatedFamId)!;
        this.parfumService
        .updateParfum(this.currentParfum)
        .subscribe((parf) => {
          this.router.navigate(['/RechercheParFamille']);
        });
        }

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
