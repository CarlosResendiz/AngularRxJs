import { Observer } from 'rxjs';

const observer: Observer<any> = {
 next: result => console.log(`result received ${result}`),
 error: err => console.log(`error happened ${err}`),
 complete: () => console.log(`that's it`),
} as Observer<any>;

