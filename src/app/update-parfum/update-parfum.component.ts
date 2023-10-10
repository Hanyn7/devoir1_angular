import { Component, OnInit } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Image } from '../model/image.model';

import { ActivatedRoute, Router } from '@angular/router';
import { ParfumService } from '../services/parfum.service';
import { Famille } from '../model/famille.model';

@Component({
  selector: 'app-update-parfum',
  templateUrl: './update-parfum.component.html'
})
export class UpdateParfumComponent implements OnInit {
  familles! : Famille[];
  updatedFamId! : number;
  currentParfum = new Parfum();
  myImage! : string;
  uploadedImage!: File;
isImageUpdated: Boolean=false;




  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private parfumService: ParfumService) { }

              /*ngOnInit(): void {
                this.parfumService.listeFamilles().
                subscribe(fams =>  {console.log(fams);
                  this.familles = fams._embedded.familles;
                  }
                );
                this.parfumService.consulterParfum(this.activatedRoute.snapshot.params['id'])
  .subscribe(parf => {
    this.currentParfum = parf;
    this.updatedFamId = this.currentParfum.famille.idFam;

    if (this.currentParfum.image) {
      this.parfumService.loadImage(this.currentParfum.image.idImage)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    }
  });

             
                }*/



                ngOnInit(): void {
                  this.parfumService.listeFamilles().
                  subscribe(cats => {this.familles = cats._embedded.familles;
                  });
                  this.parfumService.consulterParfum(this.activatedRoute.snapshot.params['id'])
                  .subscribe( parf =>{ this.currentParfum = parf;
                  this.updatedFamId = parf.famille.idFam;
                  } ) ;
                  }
                /*updateParfum() {
                  this.currentParfum.famille = this.familles.find(cat => cat.idFam ==
                  this.updatedFamId)!;
                  //tester si l'image du Parfum a été modifiée
                  if (this.isImageUpdated)
                  {
                  this.parfumService
                  .uploadImage(this.uploadedImage, this.uploadedImage.name)
                  .subscribe((img: Image) => {
                  this.currentParfum.image = img;
                  this.parfumService
                  .updateParfum(this.currentParfum)
                  .subscribe((prod) => {
                  this.router.navigate(['parfums']);
                  });
                  });
                  }
                  else{
                  this.parfumService
                  .updateParfum(this.currentParfum)
                  .subscribe((prod) => {
                  this.router.navigate(['parfums']);
                  });
                  }
                  }*/

                  updateParfum() {
                    this.currentParfum.famille = this.familles.find(fam => fam.idFam ==
                    this.updatedFamId)!;
                    this.parfumService
                    .updateParfum(this.currentParfum)
                    .subscribe((parf) => {
                    this.router.navigate(['parfums']);
                    });
                    }
                
onImageUpload(event: any) {
if(event.target.files && event.target.files.length) {
this.uploadedImage = event.target.files[0];
this.isImageUpdated =true;
const reader = new FileReader();
reader.readAsDataURL(this.uploadedImage);
reader.onload = () => { this.myImage = reader.result as string; };
}
}
onAddImageParfum() {
  this.parfumService.uploadImageParf(this.uploadedImage,
  this.uploadedImage.name,this.currentParfum.idParfum)
  .subscribe( (img : Image) => {
  this.currentParfum.images.push(img);
  });
  }    

  supprimerImage(img: Image){
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.parfumService.supprimerImage(img.idImage).subscribe(() => {
    //supprimer image du tableau currentProduit.images
    const index = this.currentParfum.images.indexOf(img, 0);
    if (index > -1) {
    this.currentParfum.images.splice(index, 1);
    }
    });
    }



}
