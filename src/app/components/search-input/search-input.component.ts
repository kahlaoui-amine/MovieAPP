import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { IPopularMovies } from './../../_models/index';
import { MovieService } from './../../_services/movie.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  searchIcon = faSearch;
  results: IPopularMovies[] = [];
  currentURL: string = '';
  movie = new FormControl('');

  constructor(
    private _movie: MovieService,
    private route: Router,
    private acivatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.acivatedRoute.url.subscribe((url: UrlSegment[]) => {
      if (url.length > 0) {
        this.currentURL = url[0].path;
      } else {
        this.currentURL = '/';
      }
    });
  }

  searchMovie() {
    if (!this.movie.value) {
      return;
    }

    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.route.onSameUrlNavigation = 'reload';

    return this.route.navigate(['/search'], {
      queryParams: { query: this.movie.value },
      queryParamsHandling: 'merge',
    });
  }
}
