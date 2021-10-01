import { Injectable } from '@angular/core';
import { Contact } from './Contact';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  
  constructor() { }
  addUser(user:Contact){
    let users = [];
    if(localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users') || '{}');
      users = [user, ...users];
    }else{
      users=[user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  updateUser(user:Contact){
    localStorage.setItem('Users', JSON.stringify(user));
  }

  getUser(key: string){
    return JSON.parse(localStorage.getItem(key) || "[]");
  }

  delUser(user:Contact[]){
    localStorage.setItem('Users', JSON.stringify(user));
  }

  checkForUniqueNumber(key:number):boolean{
    if(JSON.parse(localStorage.getItem('Users')||"[]").find((user: {mobile: any})=>user.mobile==key)){return false}
    else{return true}
  }

  curId(key:number){
    let users = [];
    let index = -1;
    users = JSON.parse(localStorage.getItem("Users") || "[]");
    users.forEach((user:Contact,i:number) => {
      if(user.mobile == key){
        index = i;
        
      }
    });
    return index;
  }

  curUser(key: number){
    let users = [];
    let index = 0;
    users = JSON.parse(localStorage.getItem("Users") || "[]");
    users.forEach((user:Contact,i:number) => {
      if(user.mobile == key){
        index = i;
      }
    });
    return users[index];
  }
}
