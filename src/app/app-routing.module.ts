import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  { path: 'projects', component: ProjectComponent },
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
