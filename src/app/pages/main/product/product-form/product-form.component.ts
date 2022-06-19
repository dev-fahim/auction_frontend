import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {finalize, Observable, Subscription} from "rxjs";
import {
  CategorySchema,
  CreateProductSchema,
  ProductSchema,
  ProductsService,
  ProfileSchema
} from "../../../../../@auction/api";
import {CategoryState} from "../../../../../@auction/store/category/state";
import {differenceInCalendarDays} from "date-fns";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {GetProfile} from "../../../../../@auction/store/profile/actions";
import {GetCategories} from "../../../../../@auction/store/category/actions";
import {ProductState} from "../../../../../@auction/store/product/state";
import {CreateProduct, GetSingleProduct, UpdateProduct} from "../../../../../@auction/store/product/actions";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() guid?: string | null;
  @Input() title = 'Add Product';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    min_bid_price: new FormControl(100, [Validators.required, Validators.min(100)]),
    bid_starts: new FormControl('', [Validators.required]),
    bid_expires: new FormControl('', [Validators.required]),
  });

  has_default_dates = false;
  bid_starts: Date = new Date();
  bid_expires: Date = new Date();

  permissionLoading = true;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;
  profileSubscription?: Subscription;

  isLoading = true;
  isCategoriesLoading = true;
  isProductLoading = true;

  @Select(CategoryState.categories)
  categories$?: Observable<CategorySchema[]>;
  categoriesSubscription?: Subscription;

  @Select(ProductState.selectedProduct)
  selectedProduct$?: Observable<ProductSchema>;
  @Select(ProductState.status)
  productStateStatus$?: Observable<string>;
  productSubscription?: Subscription;

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, Date.now()) < 1;

  constructor(private store: Store,
              private productService: ProductsService,
              private msg: NzMessageService,
              private router: Router) {
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.profileSubscription = this.store.dispatch(new GetProfile()).pipe(
      finalize(() => {
        this.permissionLoading = false;
      })
    ).subscribe({
      next: () => {
        this.isCategoriesLoading = true;
        this.categoriesSubscription = this.store.dispatch(new GetCategories()).pipe(
          finalize(() => {
            this.isCategoriesLoading = false;
          })
        ).subscribe({
          next: () => {
            if (this.guid) {
              this.isLoading = true;
              this.isProductLoading = true;
              this.store.dispatch(new GetSingleProduct(this.guid)).subscribe({
                next: () => {
                  this.productSubscription = this.selectedProduct$!.subscribe({
                    next: (val) => {
                      this.bid_starts = new Date(Date.parse(val.bid_starts ?? ''));
                      this.bid_expires = new Date(Date.parse(val.bid_expires ?? ''));
                      this.has_default_dates = true;
                      this.form.setValue({
                        name: val.name,
                        category: val.category?.guid,
                        bid_starts: val.bid_starts,
                        bid_expires: val.bid_expires,
                        description: val.description,
                        min_bid_price: val.min_bid_price
                      });

                      this.isLoading = false;
                      this.isProductLoading = false;
                    },
                    error: () => {
                      this.router.navigate(['/main', 'product', 'all'])
                    }
                  });
                }
              });
            } else {
              this.isProductLoading = false;
              this.isLoading = false;
            }
          }
        });
      }
    });
  }

  splitRangedDatetime(dates: (Date | null)[]): void {
    this.form.controls['bid_starts'].setValue(dates![0]?.toISOString());
    this.form.controls['bid_expires'].setValue(dates![1]?.toISOString());
  }

  onSubmit(): void {
    const formValue = <CreateProductSchema>this.form.value;
    if (this.form.valid) {
      this.isLoading = true;
      if (this.guid) {
        this.productSubscription = this.store.dispatch(new UpdateProduct(this.guid, formValue)).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
      } else {
        this.productSubscription = this.store.dispatch(new CreateProduct(formValue)).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (this.form.invalid) {
          this.form.markAsDirty();
          this.form.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

}
