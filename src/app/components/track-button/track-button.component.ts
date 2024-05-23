import { ToastrService } from 'ngx-toastr';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetail } from './../../_models/index';
import { LocalService } from './../../_services/local.service';
import { Component, Input } from '@angular/core';
import { faFilm, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-track-button',
  templateUrl: './track-button.component.html',
  styleUrls: ['./track-button.component.scss'],
})
export class TrackButtonComponent {
  @Input('movie') movie!: IMovieDetail;
  @Input('classes') classes: string = '';
  @Input('isInside') isInside: boolean = false;
  @Input('movieId') movieId: string = '';

  isBeingTracked: boolean = false;
  filmIcon = faFilm;
  checkIcon = faCheck;
  shouldToggleAnimation = false;
  hasRouteId = this.route.snapshot.paramMap.get('id');

  options: AnimationOptions = {
    path: '/assets/animations/fireworks.json',
  };

  constructor(
    private local: LocalService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.hasRouteId = this.route.snapshot.paramMap.get('id');
      this.checkIfIsBeingTracked();
      this.shouldToggleAnimation = false;
    });
    this.local.watchStorage().subscribe((data: string) => {
      this.checkIfIsBeingTracked();
    });
  }

  startTrackingMovie() {
    if (this.isBeingTracked) {
      return this.removeFromTracking();
    }

    const objToSave = {
      id: this.movie.id,
      poster: this.movie.poster_path,
      title: this.movie.title,
      watched: true,
      watchedDate: new Date(),
    };

    const all = JSON.parse(this.local.getData('tracked') || '[]');
    const save = [...all, objToSave];

    this.local.saveData('tracked', JSON.stringify(save));
    this.showAnimation();
    this.checkIfIsBeingTracked();
  }

  showAnimation() {
    this.toastr.success(
      `${this.movie.title} added to your watched list`,
      'Watched',
      {
        progressBar: true,
      }
    );
    this.shouldToggleAnimation = true;

    window.setTimeout(() => {
      this.shouldToggleAnimation = false;
    }, 6000);
  }

  checkIfIsBeingTracked() {
    const allTrackedMovies = this.local.getData('tracked');
    const movieId = this.hasRouteId ? Number(this.hasRouteId) : this.movie.id;

    if (!allTrackedMovies) return;

    const parsedTracked = JSON.parse(allTrackedMovies);

    if (parsedTracked) {
      const isTracked = parsedTracked.filter(
        (tracked: any) => tracked.id === movieId
      );

      if (isTracked && isTracked.length > 0) {
        this.isBeingTracked = true;
      } else {
        this.isBeingTracked = false;
      }
    }
  }

  removeFromTracking() {
    const all = JSON.parse(this.local.getData('tracked') || '[]');
    const movieId = this.hasRouteId ? Number(this.hasRouteId) : this.movie.id;

    if (all && all.length > 0) {
      let alter = function (movie: any) {
        return movie.id !== movieId;
      };

      const save = all.filter(alter);

      this.local.saveData('tracked', JSON.stringify(save));
      this.isBeingTracked = false;
      this.checkIfIsBeingTracked();
    }
  }

  animationCreated(animationItem: AnimationItem): void {}
}
