import { LocalService } from './../../_services/local.service';
import { Component, HostListener } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import {
  faHome,
  faHeart,
  faFilm,
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  homeIcon = faHome;
  favouriteIcon = faHeart;
  filmIcon = faFilm;
  userIcon = faUser;
  searchIcon = faSearch;
  favoritesSize: number = 0;


  constructor(private local: LocalService) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > 100) {
      element.classList.add('header__fixed');
    } else {
      element.classList.remove('header__fixed');
    }
  }

  ngOnInit() {
    this.fetchFavorites();
    this.local.watchStorage().subscribe((data: string) => {
      this.fetchFavorites();
    });
  }

  fetchFavorites() {
    const allFav = JSON.parse(this.local.getData('favorites') || '[]');
    this.favoritesSize = allFav.length;
  }
  options: AnimationOptions = {
    path: '/assets/animations/netflix.json',
  };

  animationCreated(animationItem: AnimationItem): void {}
}
