import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';
import { ReviewService } from './review.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [MovieService, ReviewService]
})
export class MovieComponent implements OnInit {
  movieDetails: object = {};
  user: object = {};
  userMovieRating: object = {};
  movieComments: object[] = [];
  
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
  userComment: string = '';
  submitted: boolean = false;
  
  constructor(private route: ActivatedRoute,
    private http : HttpClient,
    private authService: AuthService,
  	private movieService: MovieService,
    private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.user = window['user'];
    if(!this.user) {
      this.getUser();
    } else {
      this.getMovieRatinByUser(this.user['_id']);
    }
    this.getMovieDetails();
    this.getMovieComments();
  }

  getUser(): void {    
    const id = this.route.snapshot.paramMap.get('id');
    this.authService.getUser()
      .subscribe((data: any) => {
        this.user = data;        
        this.getMovieRatinByUser(this.user['_id']);
      });
  }

  getMovieDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.fetchMovieDetails(id)
    .subscribe((data : any) => {
      this.movieDetails = data.movieDetails;
    });
  }

  getMovieComments(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.reviewService.fetchMovieComments(movieId)
    .subscribe((data : any) => {
      this.movieComments = data.movieComments;
      console.log(this.movieComments);
    });
  }

  getMovieRatinByUser(id): void {
    const userId = id;
    const movieId = this.route.snapshot.paramMap.get('id');
    this.reviewService.fetchUserRatingForMovie(userId, movieId)
    .subscribe((data : any) => {
      this.userMovieRating = data.userMovieRating;      
    });
  }

  onSubmit(): void {
    this.submitted = true;
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.user['_id'];
    let data = {
      userRating: this.userRating,
      userComment: this.userComment,
      userId: userId
    }    
    console.log(this.userComment);

    this.movieService.rateMovie(id, data)
      .subscribe((data : any) => {
        this.movieDetails = data.movieDetails;
        this.getMovieRatinByUser(userId);
      });
  }
}
