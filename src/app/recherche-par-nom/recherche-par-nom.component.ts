import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import {  Router } from '@angular/router';
import { Famille } from '../model/famille.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html'
})
export class RechercheParNomComponent implements OnInit {
  nomParfum!: string;
  parfums!: Parfum[];
  familles! : Famille[];
  IdFamille! : number;
  noPerfumesFound: boolean = false;
  allParfums!: Parfum[];
  searchTerm!: string;
  currentParfum = new Parfum();
  updatedFamId! : number;

  constructor(private parfumService: ParfumService, private router :Router) { }

  ngOnInit(): void {
    this.parfumService.listeParfum().subscribe(parfs => {
      console.log(parfs);
      this.chargerParfums();
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
  chargerParfums(){
    this.parfumService.listeParfum().subscribe(parfs => {
    this.parfums = parfs;
    });
    }
  onKeyUp(filterText : string){
    this.parfums = this.allParfums.filter(item =>
    item.nomParfum.toLowerCase().includes(filterText));
    }

  rechercherParfs() {
    this.parfumService.rechercherParNom(this.nomParfum)
      .subscribe(parfs => {
        this.parfums = parfs; 
        console.log(parfs);
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
