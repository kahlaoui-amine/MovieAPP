import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  gitHubIcon = faGithub;

  options: AnimationOptions = {
    path: '/assets/animations/popcorn.json',
  };

  animationCreated(animationItem: AnimationItem): void {}
  options2: AnimationOptions = {

    path: '/assets/animations/netflix.json',
  };

  animationCreated2(animationItem: AnimationItem): void {}
}
