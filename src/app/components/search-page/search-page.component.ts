import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute, Router } from '@angular/router';
import { IPopularMovies } from './../../_models/index';
import { MovieService } from './../../_services/movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent {
  results: IPopularMovies[] = [];
  query: string = '';
  isLoading: boolean = true;
  page: number = 1;
  tableSize: number = 7;
  total_pages: number = 0;
  total_results: number = 0;

  options: AnimationOptions = {
    path: '/assets/animations/pageNotFound.json',
  };

  optionsMovie: AnimationOptions = {
    path: '/assets/animations/movie.json',
  };

  optionsLoading: AnimationOptions = {
    path: '/assets/animations/movie.json',
  };

  constructor(
    private _movie: MovieService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.query = params['query'];
      this.isLoading = true;
      this.page = params['page'];

      this.fetchSearchedMovies(this.query, params['page']);
    });
  }

  ngOnInit() {}

  fetchSearchedMovies(query: string, page?: number) {
    if (!query) {
      this.isLoading = false;
      return;
    }

    this._movie.searchMovies(query, page).subscribe((movie) => {
      this.isLoading = false;
      this.results = movie.results;
      this.page = movie.page;
      this.total_pages = movie.total_pages;
      this.total_results = movie.total_results;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchSearchedMovies(this.query, this.page);

    this.route.navigate([], {
      queryParams: {
        query: this.query,
        page: this.page,
      },
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchSearchedMovies(this.query, this.page);
  }

  animationCreated(animationItem: AnimationItem): void {}
}
