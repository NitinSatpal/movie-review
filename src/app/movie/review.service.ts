import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReviewService {

  constructor(private http : HttpClient) {}

  fetchUserRatingForMovie(userId, movieId) : Observable <any> {
    return Observable.create(observer => {
      this.http.get('/api/review/user/' + userId + '/movie/' + movieId)
        .subscribe((data : any) => {
          observer.next({userMovieRating: data.rating});
          observer.complete();
      });
    });
  }

  fetchMovieComments(movieId) : Observable <any> {
    return Observable.create(observer => {
      this.http.get('/api/review/movie/' + movieId + '/comments')
        .subscribe((data : any) => {
          observer.next({movieComments: data.comments});
          observer.complete();
      });
    });
  }
}
