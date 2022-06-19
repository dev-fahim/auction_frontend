import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  guid?: string | null;

  constructor(private acRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.guid = this.acRouter.snapshot.paramMap.get('guid');
  }

}
