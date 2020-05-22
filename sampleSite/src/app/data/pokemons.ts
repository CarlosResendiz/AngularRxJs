import { Pokemon } from '../models/pokemon';

export class PokemonData {
  static pokemons: Pokemon[] = [
    {
      id: '1',
      name: 'Pikachu',
      type: '1',
      image: 'pikachu.png'
    },
    {
      id: '2',
      name: 'Charmander',
      type: '3',
      image: 'charmander.png'
    },
    {
      id: '3',
      name: 'Bulbasaur',
      type: '4',
      image: 'bulbasaur.png'
    },
    {
      id: '4',
      name: 'Squirtle',
      type: '2',
      image: 'squirtle.png'
    },
    {
      id: '5',
      name: 'Caterpie',
      type: '5',
      image: 'caterpie.png'
    }
  ];
}
