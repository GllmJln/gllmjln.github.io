import { Component, Input, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { Repo, RepoWithCommit } from 'src/models/github-repos';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-github-projects',
  templateUrl: './github-projects.component.html',
  styleUrls: ['./github-projects.component.scss'],
})
export class GithubProjectsComponent implements OnInit {
  @Input() view: number | undefined;

  repos: RepoWithCommit[] | undefined;
  error?: { message: string };
  loading: boolean = false;
  constructor(
    private projectService: ProjectService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects();
    this.getProjects();
  }

  getProjects(): void {
    this.loading = true;
    this.projectService.projectData$
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe((repos$: RepoWithCommit[] | undefined) => {
        this.repos = repos$;
      });
  }

  get errors() {
    return this.errorService.errors;
  }

  handleClick() {
    if (this.view && this.repos) {
      if (this.view < this.repos.length) {
        this.view = Math.min((this.view += 4), this.repos.length);
      } else if (this.view > 4) {
        this.view = 4;
      } else {
        this.view--;
      }
    }
  }
}
