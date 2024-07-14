import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import { PokemonData } from '../models/interfaces';
import PokemonCardList from '../components/PokemonCardList';

export interface MainPageProps {
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
              <div className="flex items-center gap-6">
                <PokemonCardList pokemons={pokemons} />
                <div>
                  <Outlet />
                </div>
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
