import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorService } from '../../services/error.service';
import { AppModule } from '../../app.module';

import { GithubProjectsComponent } from './github-projects.component';

describe('GithubProjectsComponent', () => {
  let component: GithubProjectsComponent;
  let fixture: ComponentFixture<GithubProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubProjectsComponent],
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ErrorService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
