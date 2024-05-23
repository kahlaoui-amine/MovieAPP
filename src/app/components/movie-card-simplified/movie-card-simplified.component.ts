import { LocalService } from './../../_services/local.service';
import { ITrackedMovies } from './../../_models/index';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card-simplified',
  templateUrl: './movie-card-simplified.component.html',
  styleUrls: ['./movie-card-simplified.component.scss'],
})
export class MovieCardSimplifiedComponent {
  @Input('movie') movie!: ITrackedMovies;
  @Output('onDelete') onDelete: EventEmitter<any> = new EventEmitter();

  constructor(private local: LocalService) {}

  poster: string = '';
  poster_url: string = `https://image.tmdb.org/t/p/w500`;
  noPoster: string = 'https://placehold.co/500x746/png?text=No+Image';

  ngOnInit() {
    this.poster = `${this.poster_url}/${this.movie?.poster}`;
  }

  onDeletePress() {
    this.onDelete.emit(this.movie.id);
  }
}
