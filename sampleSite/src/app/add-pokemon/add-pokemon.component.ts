import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonType } from '../models/pokemon-type';
import { PokemonsService } from '../pokemons/pokemons.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  pokemonTypes: PokemonType[];

  pokemonTypeSelected: PokemonType;

  errorMessage: string;

  constructor(protected pokemonService: PokemonsService) { }

  ngOnInit(): void {

    this.subscription = this.pokemonService.getPokemonTypes()
    .subscribe(pokemonTypes => {
      this.pokemonTypes = pokemonTypes;
    },
    error => this.errorMessage = error
    );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectPokemonType(pokemonType) {
    this.pokemonTypeSelected = pokemonType;
  }

  addPokemon() {

  }

}
