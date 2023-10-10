import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Famille } from '../model/famille.model';

@Component({
  selector: 'app-update-famille',
  templateUrl: './update-famille.component.html'
})
export class UpdateFamilleComponent {
  @Input()
  famille! : Famille;
  @Output() 
  familleUpdated = new EventEmitter<Famille>();
  @Input()
  ajout!:boolean;

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateFamille",this.famille);
    }

    saveFamille(){
      this.familleUpdated.emit(this.famille);
    }
}
