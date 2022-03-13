import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckGlComponent } from './deck-gl/deck-gl.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { FormsModule } from '@angular/forms';
import { core } from '@angular/compiler';

@NgModule({
  declarations: [
    AppComponent,
    DeckGlComponent,
    HomepageComponent,
    NavHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
