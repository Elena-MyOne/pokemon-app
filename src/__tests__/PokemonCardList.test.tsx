import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PokemonCardList from '../components/PokemonCardList';
import { mockPokemonList } from '../mocks/mockPokemonList';

const MockPokemonCardList = () => {
  return (
    <BrowserRouter>
      <PokemonCardList pokemons={mockPokemonList} />
    </BrowserRouter>
  );
};

describe('PokemonCardList', () => {
  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => mockPokemonList,
      })
    );

    await act(async () => {
      render(<MockPokemonCardList />);
    });
  });

  it('the component renders the specified number of cards', async () => {
    const cards = await waitFor(() => screen.getAllByTestId('card'));
    expect(screen.getByText(/ditto/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(cards.length).toBe(2);
  });
});
