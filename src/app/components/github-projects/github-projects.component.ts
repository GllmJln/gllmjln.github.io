import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Repo } from 'src/models/github-repos';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-github-projects',
  templateUrl: './github-projects.component.html',
  styleUrls: ['./github-projects.component.scss']
})
export class GithubProjectsComponent implements OnInit {
  @Input() view: number | undefined

  repos$: Repo[] = [];
  error?: { message: string }
  loading: boolean = false
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.loading = true
    this.projectService.getProjects().pipe(finalize(()=> this.loading = false)).subscribe((repos$: Repo[] | string) => {
      if (typeof repos$ === 'string') {
        this.error = { message: repos$ }
      } else {
        this.sortProjects(repos$);
      }
    })
  }

  handleClick() {
    if (this.view) {
      if (this.view < this.repos$.length) {
        this.view = Math.min(this.view += 4, this.repos$.length)
      } else if (this.view > 4) {
        this.view = 4
      } else {
        this.view--
      }
    }
  }

  private sortProjects(repos$: Repo[]) {
    this.repos$ = repos$.sort((a: { pushed_at: Date; }, b: { pushed_at: Date; }) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }
}
