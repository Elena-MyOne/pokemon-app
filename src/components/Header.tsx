import React, { useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import useLocalStorage from '../hooks/useLocalStorage';

interface HeaderProps {
  handleSearch(query: string): Promise<void>;
}

export default function Header({ handleSearch }: HeaderProps) {
  const [savedValue, setSavedValue] = useLocalStorage('PockemonCo');

  useEffect(() => {
    setSavedValue(savedValue);
  }, [savedValue, setSavedValue]);

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget.value;
    setSavedValue(target);
  }

  function handleSearchButton(): void {
    setSavedValue(savedValue);
  }

  function handleSearchForm(event: React.FormEvent) {
    event.preventDefault();
    handleSearchButton();
    handleSearch(savedValue);
  }

  return (
    <header className="flex m-auto gap-4 border-b border-gray-200 p-0 py-4 md:container justify-between items-center">
      <div className="font-bold text-yellow-400 text-xl">Pokémon</div>
      <form onSubmit={handleSearchForm} data-testid="search-form">
        <div className="flex items-center">
          <input
            type="text"
            className="grow border-gray-300 border-[1px] p-2"
            placeholder="Search for pokemon..."
            value={savedValue}
            onChange={handleChange}
          />
          <button
            className="text-2xl cursor-pointertext-black duration-300 border-[1px] border border-transparent bg-yellow-300 hover:bg-yellow-400 p-2"
            onClick={handleSearchButton}
          >
            <CiSearch />
          </button>
        </div>
      </form>
    </header>
  );
}
