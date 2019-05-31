import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchstyleComponent } from './productspecs/searchstyle/searchstyle.component';
import { AddstyleComponent } from './productspecs/addstyle/addstyle.component';
import { SpecsdetailsComponent } from './productspecs/specsdetails/specsdetails.component';
import { SpecsComponent } from './productspecs/specs/specs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchstyleComponent,
    AddstyleComponent,
    SpecsdetailsComponent,
	SpecsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
