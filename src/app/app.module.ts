import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GithubProjectsComponent } from './components/github-projects/github-projects.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StoreModule } from "@ngrx/store"
import { reducers } from './store/store.model';
import { StoreDevtoolsModule } from "@ngrx/store-devtools"

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GithubProjectsComponent,
    NavbarComponent,
    ProjectsPageComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Personal Website',
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
