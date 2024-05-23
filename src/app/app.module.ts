import { LazyImgDirective } from './lazyImageDirective';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TrackedMoviesComponent } from './components/tracked-movies/tracked-movies.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TrackButtonComponent } from './components/track-button/track-button.component';
import { MovieCardSimplifiedComponent } from './components/movie-card-simplified/movie-card-simplified.component';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { BigTitleComponent } from './components/big-title/big-title.component';
import { PageNotFoundComponent } from './components/page-not-found/page-note-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { SimilarMoviesCardComponent } from './components/similar-movies-card/similar-movies-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SearchInputComponent,
    TrackedMoviesComponent,
    MoviesListComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    TrackButtonComponent,
    MovieCardSimplifiedComponent,
    MoviesPageComponent,
    FavoriteButtonComponent,
    FavoriteListComponent,
    SearchPageComponent,
    MovieInfoComponent,
    BigTitleComponent,
    PageNotFoundComponent,
    FooterComponent,
    SimilarMoviesCardComponent,
    LazyImgDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    YouTubePlayerModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
