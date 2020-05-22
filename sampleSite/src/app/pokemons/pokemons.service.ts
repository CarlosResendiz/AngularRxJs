import { Injectable } from '@angular/core';
import { PokemonData } from '../data/pokemons';
import { of } from 'rxjs';
import { BaseService } from '../services/base.service';
import { catchError, tap } from 'rxjs/operators';
import { PokemonTypesData } from '../data/pokemon-types';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService extends BaseService {

  constructor() {
    super();
   }

  getPokemons(pokemonType?: string) {
    // simulate an observable for http request
    if (pokemonType) {
      return of(PokemonData.pokemons.filter( p => p.type === pokemonType));
    }
    return of(PokemonData.pokemons);
    // .pipe(
    //   tap(data => console.log('Products: ', JSON.stringify(data))),
    //   catchError(this.handleError)
    // );
  }

  getPokemonTypes() {
    return of(PokemonTypesData.types);
  }
}
