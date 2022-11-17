import { APP_BASE_HREF } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ErrorService } from './services/error/error.service';
import { ProjectService } from './services/project/project.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ProjectService,
        ErrorService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'personal-website'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('personal-website');
  });
});
