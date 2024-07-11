import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS, URLS } from '../models/enums';
import { PokemonData } from '../models/interfaces';
import Loader from '../components/Loader';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPokemonById = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${URLS.POKEMONS}/${id}`);

      if (!response.ok) {
        throw new Error('Network response error');
      }

      const data = await response.json();
      setPokemon(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Cannot get pokemon by id:', error);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPokemonById();
  }, [getPokemonById, id]);

  return (
    <>
      {isLoading ? (
        <div className="min-w-[300px]">
          <Loader />
        </div>
      ) : (
        <>
          {pokemon ? (
            <div className="flex flex-col gap-4 bg-gray-50 p-4 shadow-md min-w-[300px]">
              {pokemon.sprites.front_default ? (
                <figure className="h-34 flex items-center justify-center">
                  <img src={pokemon.sprites.front_default} alt={`pokemon ${pokemon.name} image`} />
                </figure>
              ) : (
                <div className="w-full h-36 bg-secondary"></div>
              )}
              <div className="flex flex-col gap-2">
                <h2 className="text-center font-bold pb-2 text-lg">{pokemon.name}</h2>
                <div>
                  <h3 className="font-semibold">Abilities: </h3>
                  <ul>
                    {pokemon.abilities.map((item) => (
                      <li key={item.ability.name} className="ml-3">
                        - {item.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Types: </h3>
                  <ul>
                    {pokemon.types.map((typeInfo) => (
                      <li key={typeInfo.type.name} className="ml-3">
                        - {typeInfo.type.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>Base Experience: {pokemon.base_experience}</p>
                <p>
                  Size: {pokemon.weight} / {pokemon.height}{' '}
                </p>
              </div>
              <button
                className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-yellow-300 hover:bg-yellow-400 p-2"
                onClick={() => navigate(`${ROUTE_PATHS.MAIN}`)}
              >
                Close details
              </button>
            </div>
          ) : (
            <div className="text-red-600">Pokemon not found</div>
          )}
        </>
      )}
    </>
  );
}
