import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseEntityService} from './course-entity.service';
import {filter, first, map, tap} from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesService: CourseEntityService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.coursesService.loaded$
      .pipe(
        tap((loaded) => {
          if (!loaded) {
            // this uses convention to try to guess the api url (assumes api and pluralizes the type) - http://localhost:4200/api/courses/
            this.coursesService.getAll();
          }
        }),
        filter(loaded => !!loaded), // only return if loaded is true - wait for the data to get loaded
        first() // when the first value gets emitted, the observable will get completed
      );
  }
}
