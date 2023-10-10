import { Component } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Famille } from '../model/famille.model';
import { ParfumService } from '../services/parfum.service';


@Component({
  selector: 'app-recherche-par-famille',
  templateUrl: './recherche-par-famille.component.html'
})
export class RechercheParFamilleComponent {
  IdFamille! : number;
  familles! : Famille[];
  parfums! : Parfum[];
  constructor(private parfumService : ParfumService) { }

  
  ngOnInit(): void {
    this.parfumService.listeFamilles().
    subscribe(fams => {this.familles = fams._embedded.familles;
    console.log(fams);
    });
    }

    onChange() {
      this.parfumService.rechercherParFamille(this.IdFamille).
      subscribe(parfs =>{this.parfums=parfs});
      }
}
