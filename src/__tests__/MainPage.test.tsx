import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage, { MainPageProps } from '../pages/MainPage';

const mockPropsForErrorMessage = () => ({
  pokemons: [],
  errorMessage: 'Data cannot be downloaded',
  isLoading: false,
  currentPage: 1,
  totalPokemons: 1,
  setCurrentPage: () => {},
});

const mockPropsForLoading = () => ({
  pokemons: [],
  errorMessage: '',
  isLoading: true,
  currentPage: 1,
  totalPokemons: 1,
  setCurrentPage: () => {},
});

const MockMainPage = (props: MainPageProps) => {
  return (
    <BrowserRouter>
      <MainPage {...props} />
    </BrowserRouter>
  );
};

describe('MainPage component', async () => {
  it('Error message is displayed if no Pokemon cards are present', () => {
    render(<MockMainPage {...mockPropsForErrorMessage()} />);
    const errorMessage = screen.getByText(/Data cannot be downloaded/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays loader when loading', () => {
    render(<MockMainPage {...mockPropsForLoading()} />);
    const loader = screen.getByText(/Loading .../i);
    expect(loader).toBeInTheDocument();
  });
});
