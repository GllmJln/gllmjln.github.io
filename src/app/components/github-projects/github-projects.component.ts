import { Component, Input, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Repo, RepoWithCommit } from 'src/models/github-repos';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-github-projects',
  templateUrl: './github-projects.component.html',
  styleUrls: ['./github-projects.component.scss'],
})
export class GithubProjectsComponent implements OnInit {
  @Input() view: number | undefined;

  repos: RepoWithCommit[] = [];
  error?: { message: string };
  loading: boolean = false;
  constructor(private projectService: ProjectService) {}

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
      .subscribe((repos$: RepoWithCommit[] | string) => {
        if (typeof repos$ === 'string') {
          this.error = { message: repos$ };
        } else {
          this.repos = repos$;
        }
      });
  }

  handleClick() {
    if (this.view) {
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
