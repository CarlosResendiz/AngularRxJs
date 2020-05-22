import { Observable } from 'rxjs';

const observable = new Observable(myObserver => {
  myObserver.next('first wave');
  myObserver.next('second wave');
  myObserver.complete();
});
