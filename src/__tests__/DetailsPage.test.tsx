import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPage from '../pages/DetailsPage';
import { mockPokemon } from '../mocks/mockPokemon';

const MockDetailsPage = (id: string) => {
  return render(
    <MemoryRouter initialEntries={[`/details/${id}`]}>
      <Routes>
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Details page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays loader when loading', () => {
    global.fetch = vi.fn(() => new Promise(() => {}) as Promise<Response>);
    MockDetailsPage('132');

    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
  });

  it('displays pokemon data when fetch is successful and hide component when close button is clicked', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemon),
        }) as Promise<Response>
    );

    MockDetailsPage('132');

    await waitFor(() => {
      const name = screen.getByRole('heading', { name: /ditto/i });
      const abilities = screen.getByRole('heading', { name: /abilities:/i });
      const types = screen.getByRole('heading', { name: /types:/i });
      const experience = screen.getByText(/Base Experience: 101/i);
      const size = screen.getByText(/Size: 40 \/ 3/i);
      const image = screen.getByRole('img', { name: /pokemon ditto image/i });
      const button = screen.getByRole('button', { name: /close details/i });

      expect(name).toBeInTheDocument();
      expect(abilities).toBeInTheDocument();
      expect(types).toBeInTheDocument();
      expect(experience).toBeInTheDocument();
      expect(size).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      expect(name).not.toBeInTheDocument();
      expect(abilities).not.toBeInTheDocument();
      expect(types).not.toBeInTheDocument();
      expect(experience).not.toBeInTheDocument();
      expect(size).not.toBeInTheDocument();
      expect(image).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    });
  });

  it('displays error message when pokemon is not found', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: false,
        }) as Promise<Response>
    );

    MockDetailsPage('132');

    await waitFor(() => {
      const errorMessage = screen.getByText(/Pokemon not found/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
