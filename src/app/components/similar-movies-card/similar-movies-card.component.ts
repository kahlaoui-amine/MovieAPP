import { IPopularMovies } from './../../_models/index';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-similar-movies-card',
  templateUrl: './similar-movies-card.component.html',
  styleUrls: ['./similar-movies-card.component.scss'],
})
export class SimilarMoviesCardComponent {
  @Input('movie') movie!: IPopularMovies;

  poster: string = '';
  poster_url: string = `https://image.tmdb.org/t/p/w500`;
  noPoster: string = 'https://placehold.co/500x746/png?text=No+Image';

  constructor() {}

  ngOnInit() {
    this.poster = `${this.poster_url}/${this.movie?.poster_path}`;
  }
}
