import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../Contact';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id:number = -1;
  searchedKeyword!: string;
  userContact : Contact[] = [];
  sortby!: string;

  constructor(private router : Router,private contactService : ContactsService) {
    this.sortby = 'Sort by..';
   }

  ngOnInit(): void {
    this.userContact = this.contactService.getUser("Users");
    console.log(this.userContact);
  }
  
  addContact = () => {
    this.router.navigate(['/addContact'], { queryParams: { update : 'false'}});
  }

  removeContact = (i:number) => {
    console.log(i);
    this.userContact.splice(i,1);
    this.contactService.delUser(this.userContact);
  }

  updateContact = (i:number) =>{
    this.router.navigate(['/updateContact/'+i], {queryParams : { update: true}});
  }

  sort = () => {
    switch(this.sortby){
      case 'firstName': this.userContact.sort((a:Contact,b:Contact) => (a.firstname > b.firstname) ? 1: ((b.firstname > a.firstname) ? -1 : 0));
                        break;
      case 'lastName':   this.userContact.sort((a:Contact,b:Contact) => (a.lastname > b.lastname) ? 1: ((b.lastname > a.lastname) ? -1 : 0));    
                        break;
      case 'mobileNumber':   this.userContact.sort((a:Contact,b:Contact) => (a.mobile > b.mobile) ? 1: ((b.mobile > a.mobile) ? -1 : 0));    
                        break;
      default: break;
    }

    // if(this.sortby == 'firstName'){
    //   this.userContact.sort((a:any,b:any) => (a.firstname > b.firstname) ? 1: ((b.firstname > a.firstname) ? -1 : 0));
    // }
    // else if(this.sortby == 'lastName'){
    //   this.userContact.sort((a:any,b:any) => (a.lastname > b.lastname) ? 1: ((b.lastname > a.lastname) ? -1 : 0));    
    // }
    
  }

}

// export class Contact{
//   firstname !: string;
//   lastname !: string;
//   mobileno !: number;
// }