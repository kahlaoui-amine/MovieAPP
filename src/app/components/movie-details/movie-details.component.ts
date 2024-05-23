import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { MovieService } from './../../_services/movie.service';
import {
  IMovieDetail,
  IVideosResponse,
  TWatchProvidersResult,
} from './../../_models/index';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieDetail } from 'src/app/_utils/mock';
import {
  faArrowLeft,
  faArrowRight,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { IPopularMovies } from './../../_models/index';

let apiLoaded = false;

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  movieDetail: IMovieDetail = movieDetail;
  movieVideos: IVideosResponse[] = [];
  watchProviders?: TWatchProvidersResult;
  similarMovies: IPopularMovies[] = [];

  activeVideo: any = {};
  movieIndex: number = 0;
  movieId: string = '';
  backdrop: string = '';
  backdrop_url: string = `https://image.tmdb.org/t/p/original`;
  poster: string = '';
  poster_url: string = `https://image.tmdb.org/t/p/w500`;
  noPoster: string = 'https://placehold.co/500x746/png?text=No+Image';
  noBackdrop: string = 'https://placehold.co/1200x800/png?text=No+Image';

  favoriteIcon = faHeart;
  backIcon = faArrowLeft;
  nextIcon = faArrowRight;

  constructor(
    private movie: MovieService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  options: AnimationOptions = {
    path: '/assets/animations/watch.json',
  };

  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.bulkLoad();
      this.movieId = this.route.snapshot.paramMap.get('id') ?? '';
    });
  }

  bulkLoad() {
    this.loadYoutubePlayer();
    this.loadMovieDetail();
    this.loadMovieVideos();
    this.loadMoviesProviders();
    this.loadSimilarMovies();
  }

  loadYoutubePlayer() {
    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  loadMovieDetail() {
    this.movie
      .getMovieDetail(this.route.snapshot.paramMap.get('id') ?? '')
      .subscribe((movie) => {
        this.movieDetail = movie;
        this.backdrop = `${this.backdrop_url}/${movie.backdrop_path}`;
        this.poster = `${this.poster_url}/${movie.poster_path}`;
      });
  }

  loadSimilarMovies() {
    this.movie
      .getSimilarMovies(this.route.snapshot.paramMap.get('id') ?? '')
      .subscribe((movie) => {
        if (movie.results.length > 4) {
          this.similarMovies = movie.results.slice(0, 4);
        } else {
          this.similarMovies = movie.results;
        }
      });
  }

  loadMovieVideos() {
    this.movie
      .getMovieVideos(this.route.snapshot.paramMap.get('id') ?? '')
      .subscribe((video) => {
        let alter = function (video: IVideosResponse) {
          return video.site === 'YouTube';
        };

        const youtubeOnly = video.results.filter(alter);

        this.movieVideos = youtubeOnly;
        if (video.results.length > 0) {
          this.movieIndex = 0;
          this.activeVideo = video.results[0];
        }
      });
  }

  loadMoviesProviders() {
    this.movie
      .getWatchProviders(this.route.snapshot.paramMap.get('id') ?? '')
      .subscribe((prov: any) => {
        if (!prov.results) return;
        const pTProviders = prov.results['US'];

        this.watchProviders = pTProviders;
      });
  }

  handleGoBack() {
    this.location.back();
  }

  handleNextVideo() {
    if (this.movieVideos.length === 1) return;

    if (this.movieIndex === Object.keys(this.movieVideos).length - 1) {
      this.movieIndex = 0;
    } else {
      this.movieIndex = this.movieIndex + 1;
    }

    this.activeVideo = this.movieVideos[this.movieIndex];
  }

  handlePreviousVideo() {
    if (this.movieVideos.length === 1) return;

    if (this.movieIndex === 0) {
      this.movieIndex = Object.keys(this.movieVideos).length - 1;
    } else {
      this.movieIndex = this.movieIndex - 1;
    }

    this.activeVideo = this.movieVideos[this.movieIndex];
  }

  animationCreated(animationItem: AnimationItem): void {}
}
