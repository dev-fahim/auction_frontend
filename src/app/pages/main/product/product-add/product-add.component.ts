import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {GetProfile} from "../../../../../@auction/store/profile/actions";
import {CategorySchema, ProfileSchema} from "../../../../../@auction/api";
import {finalize, Observable, Subscription} from "rxjs";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {CategoryState} from "../../../../../@auction/store/category/state";
import {GetCategories} from "../../../../../@auction/store/category/actions";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    min_bid_price: new FormControl(0, [Validators.required]),
    bid_starts: new FormControl('', [Validators.required]),
    bid_expires: new FormControl('', [Validators.required]),
  });

  permissionLoading = true;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;
  profileSubscription?: Subscription;

  isLoading = false;
  isCategoriesLoading = false;

  @Select(CategoryState.categories)
  categories$?: Observable<CategorySchema[]>;
  categoriesSubscription?: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.profileSubscription = this.store.dispatch(new GetProfile()).pipe(
      finalize(() => {
        this.permissionLoading = false;
        this.isLoading = true;
        this.profileSubscription?.unsubscribe();
      })
    ).subscribe({
      next: (v) => {
        // TODO: check if user has permission then call api
        this.isCategoriesLoading = true;
        this.categoriesSubscription = this.store.dispatch(new GetCategories()).pipe(
          finalize(() => {
            this.isCategoriesLoading = false;
            this.categoriesSubscription?.unsubscribe();
          })
        ).subscribe();
      }
    })
  }

}
