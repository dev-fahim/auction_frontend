import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {ProductState} from "@auction/store/product/state";
import {Observable} from "rxjs";
import {ProductSchema, ProfileSchema} from "@auction/api";
import {GetSingleProduct} from "@auction/store/product/actions";
import {ProfileState} from "@auction/store/profile/state";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  guid?: string | null;

  @Select(ProductState.selectedProduct)
  selectedProduct$?: Observable<ProductSchema>;

  @Select(ProductState.status)
  productStateStatus$?: Observable<string>;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;

  constructor(private acRouter: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    this.guid = this.acRouter.snapshot.paramMap.get('guid');
    this.store.dispatch(new GetSingleProduct(this.guid ?? ''));
  }

}
