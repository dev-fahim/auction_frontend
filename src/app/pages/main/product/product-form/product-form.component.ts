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
import {
  CreateProduct,
  GetSingleProduct,
  UnselectSingleProduct,
  UpdateProduct
} from "../../../../../@auction/store/product/actions";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() guid?: string | null;
  @Input() title = 'Add Product';
  @Input() viewLoading = false;
  @Input() product?: ProductSchema | null;

  isLoading = false;

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

  @Select(CategoryState.categories)
  categories$?: Observable<CategorySchema[]>;

  productSubscription?: Subscription;

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, Date.now()) < 1;

  constructor(private store: Store,
              private productService: ProductsService,
              private msg: NzMessageService,
              private router: Router) {
  }

  ngOnDestroy() {
    this.store.dispatch(new UnselectSingleProduct());
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
    if (this.guid && this.product) {
      if (!this.product.is_updatable) {
        this.msg.error('Product is submitted for review, so it\'s locked now');
        this.router.navigate(['/main', 'product', 'edit', this.product.guid]);
      } else {
        this.bid_starts = new Date(Date.parse(this.product.bid_starts ?? ''));
        this.bid_expires = new Date(Date.parse(this.product.bid_expires ?? ''));
        this.has_default_dates = true;
        this.form.setValue({
          name: this.product.name,
          category: this.product.category?.guid,
          bid_starts: this.product.bid_starts,
          bid_expires: this.product.bid_expires,
          description: this.product.description,
          min_bid_price: this.product.min_bid_price
        });
      }
    }
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
