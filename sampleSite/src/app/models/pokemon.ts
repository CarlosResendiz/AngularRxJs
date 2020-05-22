import { PokemonAttack } from './pokemon-attack';

export class Pokemon {
  id: string;
  name: string;
  type: string;
  attacks?: PokemonAttack[];
  image?: string;
}
