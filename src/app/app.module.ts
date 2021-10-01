import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule,routeComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsService } from './contacts.service';
@NgModule({
  declarations: [
    AppComponent,
    routeComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
