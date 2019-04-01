import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MovieService]
})
export class HomeComponent implements OnInit {

  movies: object[] = [];
  constructor(private http : HttpClient,
  	private movieService: MovieService) { }

  ngOnInit() {
  	this.movieService.fetchMovies()
	  .subscribe((data : any) => {
    	this.movies = data.movies;
  	  });
  }

}