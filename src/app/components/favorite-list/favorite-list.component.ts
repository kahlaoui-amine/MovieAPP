import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LocalService } from './../../_services/local.service';
import { IFavoritedMovies } from './../../_models/index';
import { Component } from '@angular/core';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent {
  favorites: IFavoritedMovies[] = [];

  deleteIcon = faTimes;
  removeAllIcon = faTrash;

  constructor(private local: LocalService) {}

  options: AnimationOptions = {
    path: '/assets/animations/emptyFavorites.json',
  };

  ngOnInit() {
    this.fetchFavorites();
    this.local.watchStorage().subscribe((data: string) => {
      this.fetchFavorites();
    });
  }

  fetchFavorites() {
    const allFav = JSON.parse(this.local.getData('favorites') || '[]');
    this.favorites = allFav;
  }

  clearAllFavorites() {
    this.local.saveData('favorites', JSON.stringify([]));
    this.favorites = [];
  }

  removeFavorite(id: number) {
    const allFav = JSON.parse(this.local.getData('favorites') || '[]');
    const movieId = id;

    if (allFav && allFav.length > 0) {
      let alter = function (movie: any) {
        return movie.id !== movieId;
      };

      const save = allFav.filter(alter);

      this.local.saveData('favorites', JSON.stringify(save));
      this.favorites = save;

      return;
    }
  }

  renderAddedDate(date: Date): string {
    let objectDate = new Date(date);
    let day = objectDate.getDate();

    let month = objectDate.getMonth();

    let year = objectDate.getFullYear();

    return `${day}-${month + 1}-${year}`;
  }

  animationCreated(animationItem: AnimationItem): void {}
}
