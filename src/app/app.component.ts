import { Component } from '@angular/core';
import {slideInAnimation} from "./animation";
import {ChildrenOutletContexts} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  constructor(private contexts: ChildrenOutletContexts) {
  }

  ngOnInit(): void {
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
