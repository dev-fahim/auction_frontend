import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  ProductDetailsSchema,
  ProductSchema,
  ProductsService,
  ProfileSchema,
  SubmitForProposalSchema
} from "@auction/api";
import {ActivatedRoute} from "@angular/router";
import {first, Observable, Subscription} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Select, Store} from "@ngxs/store";
import {ProductDeleteImage, ProfileState, RefreshSingleProduct} from "@auction/store";
import {
  DeleteProduct,
  GetSingleProduct,
  ProductSubmitForProposal,
  UnselectSingleProduct
} from "@auction/store";
import {ProductState} from "@auction/store";
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {getBase64} from "@auction/utils";
import {TOKEN_KEY} from "../../../../../../@auction/contants";
import {environment} from "../../../../../environments/environment";
import {NzUploadChangeParam} from "ng-zorro-antd/upload/interface";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit, OnDestroy {
  productSubscription?: Subscription;
  product?: ProductDetailsSchema;
  guid: string | null = '';

  @Select(ProfileState.profile)
  profile$: Observable<ProfileSchema> | undefined;
  profileSubscription?: Subscription;

  @Select(ProductState.selectedProduct)
  product$?: Observable<ProductDetailsSchema>;

  @Select(ProductState.status)
  productStateStatus$?: Observable<string>;

  @Select(ProductState.images)
  images?: Observable<NzUploadFile[]>;

  fileList: Array<NzUploadFile> = [];
  imageLoaded = false;

  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(private acRouter: ActivatedRoute,
              private productService: ProductsService,
              private msg: NzMessageService,
              private store: Store) {
  }

  getToken(): string {
    return 'Bearer ' + localStorage.getItem(TOKEN_KEY) ?? '';
  }

  getApiKey(): string {
    return environment.api_keys;
  }

  getUploadUrl(productGUID: string): string {
    return environment.api_base_path + '/api/products/add-image/' + productGUID;
  }

  fileChanged({file, fileList, event}: NzUploadChangeParam): void {
    console.log(file)
    if (file.response) {
      this.fileList = [];
      fileList.forEach((o) => {
        if (o.uid === file.uid) {
          o.uid = file.response['images'].pop()['guid'] ?? '';
        }
        const obj = Object.create(o);
        Object.defineProperty(obj, 'status', {writable: true});
        this.fileList.push(Object.create(obj));
      });
    }
  }

  removeImage = (file: NzUploadFile): boolean => {
    file.status = 'removed';
    this.store.dispatch(new ProductDeleteImage(file.uid));
    return true;
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
    this.profileSubscription?.unsubscribe();
    this.store.dispatch(new UnselectSingleProduct())
  }

  ngOnInit(): void {
    this.guid = this.acRouter.snapshot.paramMap.get('guid');
    this.store.dispatch(new GetSingleProduct(this.guid ?? ''));
    this.productSubscription = this.product$?.subscribe({
      next: (val) => this.product = val
    });
    this.images?.subscribe({
      next: (data) => {
        this.fileList = [];
        data.forEach((data) => {
          const obj = Object.create(data);
          Object.defineProperty(obj, 'status', {writable: true});
          this.fileList.push(obj);
        })
        this.imageLoaded = true;
      }
    });
  }

  deleteProduct(): void {
    this.store.dispatch(new DeleteProduct(this.guid ?? ''));
  }

  submitForProposal(): void {
    const proposal: SubmitForProposalSchema = {
      guid: this.guid ?? ''
    }
    this.store.dispatch(new ProductSubmitForProposal(proposal));
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
}
