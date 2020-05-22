import { Injectable } from '@angular/core';
import { PokemonData } from '../data/pokemons';
import { of, combineLatest, Observable } from 'rxjs';
import { BaseService } from '../services/base.service';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';
import { PokemonTypesData } from '../data/pokemon-types';
import { Pokemon } from '../models/pokemon';
import { PokemonType } from '../models/pokemon-type';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService extends BaseService {

  constructor() { super(); }

  //  Reactive way
  pokemons$ = of(PokemonData.pokemons);

  pokemonTypes$ = of(PokemonTypesData.types);
  // pokemonTypes$ = of([]);

  //  Combine pokemons with their types
  pokemonsWithType$ = combineLatest([
    this.pokemons$,
    this.pokemonTypes$
  ]).pipe(
      map( ([pokemons, pokemonTypes]) =>
        pokemons.map(pokemon => ({
          ...pokemon,
          type: pokemonTypes.find(p => p.id === pokemon.type).name
        }) as Pokemon)
      ),
      shareReplay(1)
    );



  //  Declarative way
  getPokemons(pokemonType?: string) {
    // simulate an observable for http request
    if (pokemonType) {
      return of(PokemonData.pokemons.filter(p => p.type === pokemonType));
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
