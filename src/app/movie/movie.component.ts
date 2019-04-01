import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: '',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [MovieService]
})
export class MovieComponent implements OnInit {
  movieDetails: object = {};
  user: object = {};
  objectKeys = Object.keys;
  leftHalfKeys: object = {    
    'released': 'Movie released on',
    'genre': 'Genre',
    'rating': 'Rating (Age suitability)',
    'studio': 'Studio',
    'year': 'Released year'
  };
  rightHalfKeys: object = {
    'dvdReleaseDate': 'DVD Released on',
    'price': 'Price',
    'aspect': 'Aspect ration',
    'versions': 'Versions available',
    'sound': 'Available sound',
    'status': 'status',
    'upc': 'UPC',
  };
  userRating: number = 0;
  submitted: boolean = false;
  constructor(private route: ActivatedRoute,
    private http : HttpClient,
    private authService: AuthService,
  	private movieService: MovieService) { }

  ngOnInit() {
  	this.getMovieDetails();
    this.getUser();
  }

  getMovieDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.fetchMovieDetails(id)
    .subscribe((data : any) => {
      this.movieDetails = data.movieDetails;
    });
  }

  getUser(): void {
    this.authService.getUser()
      .subscribe((data: any) => {
        this.user = data;
      });
  }

  onSubmit(): void {
    this.submitted = true;
    const id = this.route.snapshot.paramMap.get('id');
    let data = {
      userRating: this.userRating,
      userId: this.user._id      
    }
    this.movieService.rateMovie(id, data)
      .subscribe((data : any) => {
        this.movieDetails = data.movieDetails;
        this.submitted = false;
      });
  }
}
