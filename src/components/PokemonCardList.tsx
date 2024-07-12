import { PokemonData } from '../models/interfaces';
import PokemonCard from './PokemonCard';

interface PokemonCardListProps {
  pokemons: PokemonData[];
}

export default function PokemonCardList({ pokemons }: PokemonCardListProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-6 py-4 grow">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
