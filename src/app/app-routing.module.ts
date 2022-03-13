import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckGlComponent } from './deck-gl/deck-gl.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full',},
  { path: 'homepage', component: HomepageComponent },
  { path: 'deck-gl', component: DeckGlComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
