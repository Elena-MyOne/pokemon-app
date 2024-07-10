import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import PokemonCard from '../components/PokemonCard';
import { PokemonData } from '../models/interfaces';

interface MainPageProps {
  errorMessage: string;
  isLoading: boolean;
  pokemons: PokemonData[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPokemons: number | null;
}

export default function MainPage({
  errorMessage,
  isLoading,
  pokemons,
  currentPage,
  setCurrentPage,
  totalPokemons,
}: MainPageProps) {
  return (
    <>
      {errorMessage ? (
        <div className="text-red-500 text-center pt-4">
          <span>{errorMessage}</span>
        </div>
      ) : (
        <>
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              <div className="grid grid-cols-4 grid-rows-2 gap-6 py-4">
                {pokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
              {pokemons.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPokemons={totalPokemons}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
