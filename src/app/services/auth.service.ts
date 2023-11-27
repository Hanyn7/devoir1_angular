import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
import { Role } from '../model/Role.model';
import { VerificationRequest } from '../model/VerificationRequest.model'; // Assuming you have a VerificationRequest model
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


 /* users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
  {"username":"hanin","password":"123","roles":['USER']} ];*/

public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];
apiURL: string = 'http://localhost:8081/users';
token!:string;
private helper = new JwtHelperService();



constructor(private router: Router,private http : HttpClient) { }

login(user : User)
{
return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}

registerUser(user: User): Observable<any> {
  return this.http.post<any>(`${this.apiURL}/register`, user);
}
checkEmailExists(email: string) {
  return this.http.post<any>(this.apiURL+'/check-email', { email });
}
handleVerification(verificationRequest: VerificationRequest): Observable<any> {
  return this.http.post<any>(`${this.apiURL}/verify`,  verificationRequest,{observe:'response'})
}
saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true;
  this.decodeJWT();
 }
 loadToken() {
  this.token = localStorage.getItem('jwt')!;
  this.decodeJWT();
}
decodeJWT()
{   if (this.token == undefined)
          return;
  const decodedToken = this.helper.decodeToken(this.token);
  this.roles = decodedToken.roles;
  this.loggedUser = decodedToken.sub;
}

 
  getToken():string {
    return this.token;
  }


logout() {
  this.loggedUser = undefined!;
  this.roles = undefined!;
  this.token= undefined!;
  this.isloggedIn = false;
  localStorage.removeItem('jwt');
  this.router.navigate(['/login']);
}
isTokenExpired(): Boolean
{
return this.helper.isTokenExpired(this.token); }

isAdmin():Boolean{
if (!this.roles) 
return false;
return (this.roles.indexOf('ADMIN') >-1);
}
setLoggedUserFromLocalStorage(login : string) {
  this.loggedUser = login;
  this.isloggedIn = true;
  //this.getUserRoles(login);
  }




  deleteUser(id: number) {
    let jwt=this.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt})
    const url=`${this.apiURL}/deleteUserById/${id}`
    return this.http.delete(url,{headers:httpHeaders});
    }

    AddRoleForUser(id:number,r:Role):Observable<User>
    {
      let jwt = this.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url=`${this.apiURL}/addRole/${id}`
      return this.http.post<User>(url,r, {headers:httpHeaders});

    }

    removeRoleFromUser(id:number,r:Role):Observable<User>
    {
      let jwt = this.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url=`${this.apiURL}/removeRoleFromUer/${id}`
      return this.http.post<User>(url,r, {headers:httpHeaders});

    }

    consulterUser(id: number): Observable<User> {
      let jwt = this.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url = `${this.apiURL + '/findUserById'}/${id}`;
      return this.http.get<User>(url,{headers:httpHeaders});
      }

}
