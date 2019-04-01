import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieService {

  constructor(private http : HttpClient) {}

  fetchMovies() : Observable <any> {
  	return Observable.create(observer => {
      this.http.get('/api/movie')
        .subscribe((data : any) => {
          observer.next({movies: data.movies});
          observer.complete();
      });
    });
  }

  fetchMovieDetails(id) : Observable <any> {
    return Observable.create(observer => {
      this.http.get('/api/movie/' + id)
        .subscribe((data : any) => {
          observer.next({movieDetails: data});
          observer.complete();
      });
    });
  }

  rateMovie(id, movie): Observable <any> {
    return Observable.create(observer => {
      this.http.patch('/api/movie/' + id + '/rate/', movie)
        .subscribe((data : any) => {
          observer.next({movieDetails: data});      
          observer.complete();
      });
    });
  }
}
