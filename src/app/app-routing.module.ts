import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'addContact',component:AddContactComponent},
  {path: 'updateContact/:id', component:AddContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [HomeComponent,AddContactComponent];