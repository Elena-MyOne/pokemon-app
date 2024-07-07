import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

interface HeaderProps {
  handleSearch(query: string): Promise<void>;
}

export default function Header({ handleSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const savedValue = localStorage.getItem('PockemonCo') || '';
    setSearchValue(savedValue);
  }, []);

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget.value;
    setSearchValue(target);
  }

  function handleSearchButton(): void {
    localStorage.setItem('PockemonCo', searchValue);
  }

  function handleSearchForm(event: React.FormEvent) {
    event.preventDefault();
    handleSearchButton();
    handleSearch(searchValue);
  }

  return (
    <header className="flex m-auto gap-4 border-b border-gray-200 p-0 py-4 md:container justify-between items-center">
      <div className="font-bold text-yellow-400 text-xl">Pokémon</div>
      <form onSubmit={handleSearchForm}>
        <div className="flex items-center">
          <input
            type="text"
            className="grow border-gray-300 border-[1px] p-2"
            placeholder="Search for pokemon..."
            value={searchValue}
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
