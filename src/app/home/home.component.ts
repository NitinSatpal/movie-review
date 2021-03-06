import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieService } from '../movie/movie.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {

  movies: object[] = [];
  constructor(private http : HttpClient,
    private router: Router,
  	private movieService: MovieService,
    private authService: AuthService,) {
  }

  ngOnInit() {
    if(!window['user'] && !this.authService.getUser()) {
      this.router.navigate(['/auth/login/']);
      return;
    }
  	this.movieService.fetchMovies()
	  .subscribe((data : any) => {
    	this.movies = data.movies;
  	  });
  }

  navigateToMovieDetails(movieId): void {
    this.router.navigate(['/movie/details/' + movieId]);
  }

}
