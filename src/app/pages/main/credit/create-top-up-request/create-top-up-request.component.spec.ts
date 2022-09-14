import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopUpRequestComponent } from './create-top-up-request.component';

describe('CreateTopUpRequestComponent', () => {
  let component: CreateTopUpRequestComponent;
  let fixture: ComponentFixture<CreateTopUpRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTopUpRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTopUpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
