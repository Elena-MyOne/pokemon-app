import { BrowserRouter } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { mockPokemon } from '../mocks/mockPokemon';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

const MockPokemonCard = () => {
  return (
    <BrowserRouter>
      <PokemonCard pokemon={mockPokemon} />
    </BrowserRouter>
  );
};

describe('PokemonCard component', () => {
  it('renders the relevant card data', () => {
    render(<MockPokemonCard />);
    const cardName = screen.getByRole('heading', {
      name: /ditto/i,
    });
    const pokemonWeight = screen.getByText(/weight: 40/i);
    const pokemonHeight = screen.getByText(/height: 3/i);
    const pokemonBaseExperience = screen.getByText(/base experience: 101/i);
    expect(cardName).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonBaseExperience).toBeInTheDocument();
  });
});
