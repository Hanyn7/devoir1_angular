import { Injectable } from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { Famille } from '../model/famille.model';
import {Image } from '../model/image.model';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FamilleWrapper } from '../model/FamilleWrapped.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class ParfumService {
  parfums :  Parfum[] =[];
  //familles : Famille[];
  apiURL: string = 'http://localhost:8080/parfums/api';
  apiURLFam: string = 'http://localhost:8080/parfums/fam';
  constructor(private http : HttpClient, private authService : AuthService) {
 /*this.familles = [ {idFam : 1, nomFam : "florale"},
  {idFam : 2, nomFam : "oud"}];
  this.parfums = [
  { idParfum : 1, nomParfum : "Dior", prixParfum : 330,
  dateCreation : new Date("12/09/2011"), famille : {idFam : 1, nomFam : "florale"}},
  { idParfum : 2, nomParfum : "Chanel", prixParfum : 1000,
  dateCreation : new Date("04/01/2011"), famille : {idFam : 1, nomFam : "florale"}},
  { idParfum : 3, nomParfum : "Escandale", prixParfum : 2500,
  dateCreation : new Date("11/02/2011"), famille : {idFam : 1, nomFam : "oud"}},];*/
}

 /* listeParfum():Observable<Parfum[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Parfum[]>(this.apiURL+"/all",{headers:httpHeaders});
      }*/
      listeParfum(): Observable<Parfum[]>{
        return this.http.get<Parfum[]>(this.apiURL+"/all");
       }
       

  
  ajouterParfum( parf: Parfum):Observable<Parfum>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Parfum>(this.apiURL+"/addparf", parf, {headers:httpHeaders});}


supprimerParfum( id: number){
  const url = `${this.apiURL}/delparf/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.delete(url, {headers:httpHeaders});
    
  }


consulterParfum(id:number): Observable<Parfum>{
  const url = `${this.apiURL}/getbyid/${id}`;
let jwt = this.authService.getToken();
jwt = "Bearer "+jwt;
let httpHeaders = new HttpHeaders({"Authorization":jwt})
return this.http.get<Parfum>(url,{headers:httpHeaders});     
  }

 

  updateParfum(parf :Parfum) : Observable<Parfum>
{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put<Parfum>(this.apiURL+"/updateparf", parf, {headers:httpHeaders});}

  /*trierParfums(){
    this.parfums = this.parfums.sort((n1,n2) => {
    if (n1.idParfum! > n2.idParfum!) {
    return 1;
    }
    if (n1.idParfum! < n2.idParfum!) {
    return -1;
    }
    return 0;
    });
    }*/

    listeFamilles():Observable<FamilleWrapper> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<FamilleWrapper>(this.apiURLFam,{headers:httpHeaders}    );
    }
    

      /*consulterFamille(id:number): Famille{
        return this.familles.find(fam => fam.idFam == id)!;
        }*/

        /*rechercherParFamille(idFam: number):Observable< Parfum[]> {
          const url = `${this.apiURL}/fam/prodscat/${idFam}`;
          return this.http.get<Parfum[]>(url);

          } */

          rechercherParFamille(idFam: number): Observable<Parfum[]> {
            const url = `${this.apiURL}/fam/prodscat/${idFam}`;
        
            // Get the token from the authentication service
            const jwt = this.authService.getToken();
            const httpHeaders = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            });
        
            return this.http.get<Parfum[]>(url, { headers: httpHeaders });
          }
        
    
          rechercherParNom(nom: string):Observable< Parfum[]> {
            const url = `${this.apiURL}/fam/prodsByName/${nom}`;
            return this.http.get<Parfum[]>(url);
            }

            ajouterFamille(fam: Famille): Observable<Famille> {
              const url = this.apiURLFam;
          
              // Get the token from the authentication service
              const jwt = this.authService.getToken();
              const httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              });
          
              return this.http.post<Famille>(url, fam, { headers: httpHeaders });
            }
        


            uploadImage(file: File, filename: string): Observable<Image>{
              const imageFormData = new FormData();
              imageFormData.append('image', file, filename);
              const url = `${this.apiURL + '/image/upload'}`;
              return this.http.post<Image>(url, imageFormData);
              }
              loadImage(id: number): Observable<Image> {
              const url = `${this.apiURL + '/image/get/info'}/${id}`;
              return this.http.get<Image>(url);
              }

              uploadImageParf(file: File, filename: string, idParf:number): Observable<any>{
                const imageFormData = new FormData();
                imageFormData.append('image', file, filename);
                const url = `${this.apiURL + '/image/uplaodImageParf'}/${idParf}`;
                return this.http.post(url, imageFormData);
                }

                supprimerImage(id : number) {
                  const url = `${this.apiURL}/image/delete/${id}`;
                  return this.http.delete(url, httpOptions);
                  }
                  uploadImageFS(file: File, filename: string, idParf : number): Observable<any>{
                    const imageFormData = new FormData();
                    imageFormData.append('image', file, filename);
                    const url = `${this.apiURL + '/image/uploadFS'}/${idParf}`;
                    return this.http.post(url, imageFormData);
                    }
                  
}


