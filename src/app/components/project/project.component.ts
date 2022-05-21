import { Component, OnInit } from '@angular/core';
import { Project } from 'src/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects$: Project[] = [];
  view = 4;
  error: { message: string } = { message: '' }
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((projects$) => {
      if (typeof projects$ === 'string') {
        this.error = { message: projects$ }
      } else {
        this.sortProjects(projects$);
      }
    })
  }

  handleClick() {
    if (this.view < this.projects$.length) {
      this.view = Math.min(this.view += 4, this.projects$.length)
    } else if (this.view > 4) {
      this.view = 4
    } else {
      this.view--
    }
    console.log(this.view)
  }

  private sortProjects(projects$: Project[]) {
    this.projects$ = projects$.sort((a: { pushed_at: Date; }, b: { pushed_at: Date; }) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }
}
