import { PokemonData } from '../models/interfaces';

interface PokemonCardProps {
  pokemon: PokemonData;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {

  return (
    <div className="bg-gray-50 p-4 w-56 hover:shadow-lg cursor-pointer duration-300 shadow-md">
      {pokemon.sprites.front_default ? (
        <figure className="h-36 flex items-center justify-center">
          <img src={pokemon.sprites.front_default} alt={`pokemon ${pokemon.name} image`} />
        </figure>
      ) : (
        <div className="w-full h-36 bg-secondary"></div>
      )}

      <div className="items-center">
        <h2 className="text-center font-bold pb-2">{pokemon.name}</h2>
        <p>Weight: {pokemon.weight}</p>
        <p>Height: {pokemon.height}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
      </div>
    </div>
  );

}
