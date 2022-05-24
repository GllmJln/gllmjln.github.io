import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubProjectsComponent } from './components/github-projects/github-projects.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'projects/github', component: GithubProjectsComponent },
  { path: 'welcome', component: LandingPageComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
