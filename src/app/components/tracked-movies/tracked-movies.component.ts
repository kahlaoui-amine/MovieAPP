import { ITrackedMovies } from './../../_models/index';
import { LocalService } from './../../_services/local.service';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-tracked-movies',
  templateUrl: './tracked-movies.component.html',
  styleUrls: ['./tracked-movies.component.scss'],
})
export class TrackedMoviesComponent {
  trackedMovies: ITrackedMovies[] = [];

  options: AnimationOptions = {
    path: '/assets/animations/empty.json',
  };

  constructor(private local: LocalService) {}

  ngOnInit() {
    this.fetchTrackedMovies();
    this.local.watchStorage().subscribe((data: string) => {
      this.fetchTrackedMovies();
    });
  }

  fetchTrackedMovies() {
    const movies = JSON.parse(this.local.getData('tracked') || '[]');
    this.trackedMovies = movies;
  }

  handleOnDelete(id: number) {
    const all = JSON.parse(this.local.getData('tracked') || '[]');
    const movieId = id;

    if (all && all.length > 0) {
      let alter = function (movie: any) {
        return movie.id !== movieId;
      };

      const save = all.filter(alter);

      this.local.saveData('tracked', JSON.stringify(save));
      this.trackedMovies = save;

      return;
    }
  }

  animationCreated(animationItem: AnimationItem): void {}
}
