import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchstyleComponent } from './productspecs/searchstyle/searchstyle.component';
import { AddstyleComponent } from './productspecs/addstyle/addstyle.component';
import { SpecsdetailsComponent } from './productspecs/specsdetails/specsdetails.component';

const routes: Routes = [
  { path: 'Home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'ProductSpecs', redirectTo: 'ProductSpecs/SearchStyle', pathMatch: 'full' },  
  { path: 'ProductSpecs/SearchStyle', component: SearchstyleComponent },
  { path: 'ProductSpecs/AddStyle', component: AddstyleComponent },
  { path: 'ProductSpecs/SpecsDetails/Season/:seasonId/Style/:styleId/SampleStage/:sampleStage', component: SpecsdetailsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
