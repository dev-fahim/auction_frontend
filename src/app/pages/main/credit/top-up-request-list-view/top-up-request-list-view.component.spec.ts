import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpRequestListViewComponent } from './top-up-request-list-view.component';

describe('TopUpRequestListViewComponent', () => {
  let component: TopUpRequestListViewComponent;
  let fixture: ComponentFixture<TopUpRequestListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpRequestListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpRequestListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
