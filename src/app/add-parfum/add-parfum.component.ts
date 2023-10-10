import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Image } from '../model/image.model';
import { ParfumService } from '../services/parfum.service';
import { Famille } from '../model/famille.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-parfum',
  templateUrl: './add-parfum.component.html'
})
export class AddParfumComponent implements OnInit {
  newParfum = new Parfum();
  message: string ="";
  familles! : Famille[];
  newIdFam! : number;
  newFamille! : Famille;
  uploadedImage!: File;
  imagePath: any;


  constructor(private parfumService: ParfumService,
    private router :Router) { }
 
    ngOnInit(): void {
      this.parfumService.listeFamilles().
      subscribe(fams => {console.log(fams);
        this.familles=fams._embedded.familles;
      
      });
      }
  
          /*addParfum(){
            this.parfumService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
            this.newParfum.image=img;
            this.newParfum.famille = this.familles.find(cat => cat.idFam== this.newIdFam)!;
            this.parfumService.ajouterParfum(this.newParfum).subscribe(() => {
            this.router.navigate(['parfums']);
            });
            });
            }*/
            addParfum(){
              this.newParfum.famille = this.familles.find(fam => fam.idFam == this.newIdFam)!;
              this.parfumService
              .ajouterParfum(this.newParfum)
              .subscribe((prod) => {
              this.parfumService
              .uploadImageFS(this.uploadedImage,this.uploadedImage.name,prod.idParfum)
              .subscribe((response: any) => {}
              );
              this.router.navigate(['parfums']);
              });
              }

          onImageUpload(event: any) {
            this.uploadedImage = event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(this.uploadedImage);
            reader.onload = (_event) => { this.imagePath = reader.result; }
            }

}

