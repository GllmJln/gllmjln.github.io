import { Component, Input, OnInit } from '@angular/core';
import { Repo } from 'src/models/github-repos';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-github-projects',
  templateUrl: './github-projects.component.html',
  styleUrls: ['./github-projects.component.scss']
})
export class GithubProjectsComponent implements OnInit {
  @Input() view: number | undefined

  repos$: Repo[] = [];
  error: { message: string } = { message: '' }
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((repos$) => {
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
    console.log(this.view)
  }

  private sortProjects(repos$: Repo[]) {
    this.repos$ = repos$.sort((a: { pushed_at: Date; }, b: { pushed_at: Date; }) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }
}
