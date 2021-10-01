import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Contact } from '../Contact';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  updateContact!: string;
  contactId!: number;

  fname!: string;
  lname!: string;
  mobileno!: string;
  

  constructor(private router: Router, private contactService : ContactsService, private _routeParams: ActivatedRoute) { 
    
  }

  contactDetail : any = [];
  user: any = {};
  
  form = new FormGroup({
    firstname: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]),
    lastname: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)])
  })
  
  ngOnInit(): void {
    // this._routeParams.snapshot.params.subscribe((param:any) => {
    //   if(param.update){
    //     this.contactDetail = JSON.parse(localStorage.getItem("Users") || "[]");
    //     this.contactId = param.userId;
    //     console.log(this.contactDetail[this.contactId].firstname);
    //     this.fname = this.contactDetail[this.contactId].firstname;
    //     this.lname = this.contactDetail[this.contactId].lastname;
    //     this.mobileno = this.contactDetail[this.contactId].mobile;
    //   }else{
    //     this.fname = '';
    //     this.lname='';
    //     this.mobileno = '';
    //   }
    // })
    console.log(this._routeParams.snapshot.params.id);
    this._routeParams.queryParams.subscribe(params => {
      this.updateContact = params.update;
      console.log(params.update);
    })

    // loads the values of the id sent through route
    console.log(this.updateContact);
    if(this.updateContact == 'true'){
    console.log("hello");
    this.contactDetail = this.contactService.curUser(this._routeParams.snapshot.params.id);
    this.form = new FormGroup({
      firstname: new FormControl(this.contactDetail['firstname'],[Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(this.contactDetail['lastname'], [Validators.required]),
      mobile: new FormControl(this.contactDetail['mobile'], [Validators.required, Validators.minLength(10)])
    })
  }
    // console.log(this.fname);
  }

 


  get f(){
    return this.form.controls;
  }


  

  onSubmit = () =>{
    if(this.updateContact == 'true'){
      console.log(this.updateContact);
      console.log(this.contactService.getUser("Users"));
      let userContacts = this.contactService.getUser("Users");
      let userId = this.contactService.curId(this._routeParams.snapshot.params.id);
      userContacts[userId] = this.form.value;
      this.contactService.updateUser(userContacts);
      this.router.navigateByUrl("/");
    }else{
      
      console.log(this.form.value);
      // this.user = Object.assign(this.user, this.form.value);
      let userInfo: Contact = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        mobile: this.form.value.mobile
      }
      if(this.contactService.checkForUniqueNumber(this.form.value.mobile)){
        this.contactService.addUser(userInfo);
        this.router.navigateByUrl("/");
      }
      else{
        alert("Phone Number already exists... Try another number");
      }
      }
    }

}
