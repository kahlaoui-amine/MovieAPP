import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
})
export class MovieInfoComponent {
  @Input('title') title: any = '';
  @Input('subtitle') subtitle: string = '';
  @Input('classes') classes: string = '';
}
