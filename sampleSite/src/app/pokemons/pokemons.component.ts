import { Component, OnInit } from '@angular/core';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from '../models/pokemon';
import { PokemonType } from '../models/pokemon-type';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemons.component.html'
})
export class PokemonsComponent implements OnInit {

  constructor(protected pokemonService: PokemonsService) { }

  pokemons: Pokemon[];
  pokemonTypes: PokemonType[];
  pokemonType: string;

  ngOnInit(): void {

    this.pokemonType = 'All';

    this.getPokemonsTypes();
  }

  getPokemons(pokemonType?: string) {
    this.pokemonService.getPokemons(pokemonType)
      .subscribe(pokemons => {
        this.pokemons = pokemons.map(p => {
          return {
            ...p,
            type: this.pokemonTypes.find(pt => pt.id === p.type).name
          };
        }) ;
      });
  }

  getPokemonsTypes() {
    this.pokemonService.getPokemonTypes()
      .subscribe(pokemonTypes => {
        this.pokemonTypes = [];
        this.pokemonTypes.push({ id: '0', name: 'All' } as PokemonType);
        this.pokemonTypes = [...this.pokemonTypes, ...pokemonTypes];
        this.getPokemons();
      });
  }

  selectPokemonType(pokemonType) {
    if (pokemonType === '0') {
      this.getPokemons();
    } else {
      this.getPokemons(pokemonType);
    }
  }

}
