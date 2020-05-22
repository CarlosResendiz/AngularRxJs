import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from '../models/pokemon';
import { PokemonType } from '../models/pokemon-type';
import { Subscription, combineLatest, of, Subject, EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemons.component.html'
})
export class PokemonsComponent implements OnInit, OnDestroy {

  constructor(protected pokemonService: PokemonsService) { }

  subscription: Subscription;
  errorMessage: string;
  pokemonType: string;

  //  Declarative way
  pokemons: Pokemon[];
  pokemonTypes: PokemonType[];

  //  Reactive way 1

  pokemons$ = this.pokemonService.pokemons$;
  pokemonTypes$ = this.pokemonService.pokemonTypes$;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  pokemonTypesDD$ = this.pokemonTypes$.pipe(
    mergeMap(pokemonTypes => {
      const pokemonTypesToReturn: PokemonType[] = [{ id: '0', name: 'All' }];
      return of(pokemonTypesToReturn.length ? [...pokemonTypesToReturn, ...pokemonTypes] : []);
    }),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  // //  Reactive way 2

  // vm$ = combineLatest([
  //   this.pokemons$,
  //   this.pokemonTypes$
  // ]).pipe(
  //   map(([pokemons, pokemonTypes]) =>
  //     ({ pokemons, pokemonTypes }))
  // );

  ngOnInit(): void {

    this.pokemonType = 'All';

    //  Declarative way

    this.subscription = this.pokemonService.getPokemonTypes()
      .subscribe(pokemonTypes => {
        this.pokemonTypes = [];
        this.pokemonTypes.push({ id: '0', name: 'All' } as PokemonType);
        this.pokemonTypes = [...this.pokemonTypes, ...pokemonTypes];
        // Call the other observable
        this.getPokemons();
      },
        error => this.errorMessage = error
      );

  }

  ngOnDestroy() {
    //  Declarative way
    // this.subscription.unsubscribe();
  }


  // Declarative way

  getPokemons(pokemonType?: string) {
    this.pokemonService.getPokemons(pokemonType)
      .subscribe(pokemons => {
        this.pokemons = pokemons.map(p => {
          return {
            ...p,
            type: this.pokemonTypes.find(pt => pt.id === p.type).name
          };
        });
      },
        error => this.errorMessage = error
      );
  }

  selectPokemonType(pokemonType) {
    // Declarative way

    if (pokemonType === '0') {
      this.getPokemons();
    } else {
      this.getPokemons(pokemonType);
    }
  }

}
