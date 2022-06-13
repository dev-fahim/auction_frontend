import { TestBed } from '@angular/core/testing';

import { AuthNotGuard } from './auth-not.guard';

describe('AuthNotGuard', () => {
  let guard: AuthNotGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthNotGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
