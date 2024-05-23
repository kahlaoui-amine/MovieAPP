import { mockMovies } from './../../_utils/mock';
import { IPopularMovies } from './../../_models/index';
import { MovieService } from './../../_services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent {
  popularMovies: IPopularMovies[] = mockMovies;

  constructor(private movies: MovieService) {}

  ngOnInit() {
    this.movies.getPopularMovies().subscribe((movie) => {
      this.popularMovies = movie.results;
    });
  }
}
