import { BrowserRouter } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import { mockPokemon } from '../mocks/mockPokemon';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

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
    const cardImage = screen.getByRole('img', { name: /pokemon ditto image/i });
    const cardName = screen.getByRole('heading', {
      name: /ditto/i,
    });
    const pokemonWeight = screen.getByText(/weight: 40/i);
    const pokemonHeight = screen.getByText(/height: 3/i);
    const pokemonBaseExperience = screen.getByText(/base experience: 101/i);
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonBaseExperience).toBeInTheDocument();
  });

  it('navigates to details page when clicked', async () => {
    render(<MockPokemonCard />);
    const cardElement = screen.getByTestId('card');
    fireEvent.click(cardElement);

    const expectedURL = `/details/${mockPokemon.id}`;
    expect(window.location.pathname).toBe(expectedURL);
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(<MockPokemonCard />);
    const cardElement = screen.getByTestId('card');
    fireEvent.click(cardElement);

    const cardImage = screen.getByRole('img', { name: /pokemon ditto image/i });
    const cardName = screen.getByRole('heading', {
      name: /ditto/i,
    });
    expect(cardImage).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
  });
});
