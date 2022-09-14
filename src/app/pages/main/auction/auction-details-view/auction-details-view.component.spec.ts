import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionDetailsViewComponent } from './auction-details-view.component';

describe('AuctionDetailsViewComponent', () => {
  let component: AuctionDetailsViewComponent;
  let fixture: ComponentFixture<AuctionDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
