import { of } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

of(2, 4, 6)
  .pipe(
    map(item => item * 2),
    tap(item => console.log(item)),
    take(2)
  ).subscribe(console.log);
  