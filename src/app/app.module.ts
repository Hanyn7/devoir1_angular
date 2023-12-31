import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { AddParfumComponent } from './add-parfum/add-parfum.component';
import { UpdateParfumComponent } from './update-parfum/update-parfum.component';
import { RechercheParFamilleComponent } from './recherche-par-famille/recherche-par-famille.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListeFamillesComponent } from './liste-familles/liste-familles.component';
import { UpdateFamilleComponent } from './update-famille/update-famille.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
  declarations: [
    AppComponent,
    ParfumsComponent,
    AddParfumComponent,
    UpdateParfumComponent,
    RechercheParFamilleComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeFamillesComponent,
    UpdateFamilleComponent,
    LoginComponent,
    ForbiddenComponent,
    AdminPageComponent,
    AddRoleUserComponent,
    SignUpComponent,
    VerificationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true}
     ],
       bootstrap: [AppComponent]
})
export class AppModule { }
