import { Famille } from "./famille.model";
import { Image } from "./image.model";


export class Parfum {
  idParfum! : number;
  nomParfum! : string;
  prixParfum! : number;
   dateCreation! : Date ;
   famille! : Famille; 
   image! : Image;
   imageStr!:string;

   images!: Image[];
   }
  