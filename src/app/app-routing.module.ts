import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParfumsComponent } from './parfums/parfums.component';
import { AddParfumComponent } from './add-parfum/add-parfum.component';
import { UpdateParfumComponent } from './update-parfum/update-parfum.component';
import { RechercheParFamilleComponent } from './recherche-par-famille/recherche-par-famille.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeFamillesComponent } from './liste-familles/liste-familles.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ParfumGuard } from './parfum.guard';

const routes: Routes = [
{ path: 'parfums', component: ParfumsComponent },
{ path: 'add-parfum', component: AddParfumComponent ,canActivate:[ParfumGuard]},
{ path: 'updateParfum/:id', component: UpdateParfumComponent },
{path: "RechercheParFamille", component : RechercheParFamilleComponent},
{path: "rechercheParNom", component : RechercheParNomComponent},
{path: "listeFamilles", component : ListeFamillesComponent},
{path: 'login', component: LoginComponent},
{path: 'app-forbidden', component: ForbiddenComponent},

{ path: '', redirectTo: 'parfums', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }