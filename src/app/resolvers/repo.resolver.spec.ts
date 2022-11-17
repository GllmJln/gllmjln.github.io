import { TestBed } from '@angular/core/testing';

import { RepoResolver } from './repo.resolver';

describe('RepoResolver', () => {
  let resolver: RepoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
