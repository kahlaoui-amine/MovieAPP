import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from './../../_services/local.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IMovieDetail } from './../../_models/index';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent {
  @Input('movie') movie!: IMovieDetail;
  @Input('classes') classes: string = '';

  favoriteIcon = faHeart;
  isFavorited: boolean = false;
  hasRouteId = this.route.snapshot.paramMap.get('id');
  shouldToggleAnimation: boolean = false;
  poster_url: string = `https://image.tmdb.org/t/p/w500`;

  options: AnimationOptions = {
    path: '/assets/animations/favorite.json',
  };

  constructor(private local: LocalService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.hasRouteId = this.route.snapshot.paramMap.get('id');
      this.checkIfIsBeingFavorited();
    });
    this.local.watchStorage().subscribe((data: string) => {
      this.checkIfIsBeingFavorited();
    });
  }

  toggleFavorites() {
    if (this.isFavorited) {
      return this.removeFromFavorite();
    }

    const objToSave = {
      id: this.movie.id,
      poster: `${this.poster_url}${this.movie?.poster_path}`,
      title: this.movie.title,
      favorited: true,
      // watched: this.checkIfFavHasBeenWatched(),
      favoritedDate: new Date(),
    };

    const all = JSON.parse(this.local.getData('favorites') || '[]');
    const save = [...all, objToSave];

    this.local.saveData('favorites', JSON.stringify(save));
    this.showAnimation();
    this.checkIfIsBeingFavorited();
  }

  checkIfIsBeingFavorited() {
    const allFavoritedMovies = this.local.getData('favorites');
    const movieId = this.hasRouteId ? Number(this.hasRouteId) : this.movie.id;

    if (!allFavoritedMovies) return;

    const parsedFavorited = JSON.parse(allFavoritedMovies);

    if (parsedFavorited) {
      const isTracked = parsedFavorited.filter(
        (favorited: any) => favorited.id === movieId
      );

      if (isTracked && isTracked.length > 0) {
        this.isFavorited = true;
      } else {
        this.isFavorited = false;
      }
    }
  }

  removeFromFavorite() {
    const all = JSON.parse(this.local.getData('favorites') || '[]');
    const movieId = this.hasRouteId ? Number(this.hasRouteId) : this.movie.id;

    if (all && all.length > 0) {
      let alter = function (movie: any) {
        return movie.id !== movieId;
      };

      const save = all.filter(alter);

      this.local.saveData('favorites', JSON.stringify(save));
      this.isFavorited = false;
      this.checkIfIsBeingFavorited();
    }
  }

  showAnimation() {
    this.shouldToggleAnimation = true;

    window.setTimeout(() => {
      this.shouldToggleAnimation = false;
    }, 1200);
  }

  checkIfFavHasBeenWatched() {}

  animationCreated(animationItem: AnimationItem): void {}
}
