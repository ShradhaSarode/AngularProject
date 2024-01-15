import { Injectable } from '@angular/core';
import { Users } from './usersDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:Users[]=[];

  constructor() { }

  public addUsers(users:Users)
  {
    this.users.push({
      uName:users.uName,email:users.email,password:users.password
    });
  }

  public validateUser(user:Users):boolean
  {
    let result:boolean=false;
    for(let i=0;i<this.users.length;i++)
    {
      if(this.users[i].email==user.email&&this.users[i].password==user.password)
      {
        result =true;
        break;
      }
    }
    return result;
  }
}
