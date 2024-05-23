import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-page-note-found',
  templateUrl: './page-note-found.component.html',
  styleUrls: ['./page-note-found.component.scss'],
})
export class PageNotFoundComponent {
  options: AnimationOptions = {
    path: '/assets/animations/MovieNotFound.json',
  };

  animationCreated(animationItem: AnimationItem): void {}
}
