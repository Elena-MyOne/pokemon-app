import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from '../components/Header';

const MockHeader = () => {
  return (
    <BrowserRouter>
      <Header handleSearch={vi.fn()} />
    </BrowserRouter>
  );
};

describe('Header component', () => {
  describe('header component rendering', () => {
    it('renders logo as a link with correct text', () => {
      render(<MockHeader />);
      const logoElement = screen.getByText(/Pokémon/i);
      expect(logoElement).toBeInTheDocument();
    });

    it('renders search form with search input and submit button', () => {
      render(<MockHeader />);
      const FormElement = screen.getByTestId('search-form');
      expect(FormElement).toBeInTheDocument();
      expect(FormElement).toContainHTML('button');
      expect(FormElement).toContainHTML('input');
    });
  });

  describe('Search component', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should to be able to type in input', () => {
      render(<MockHeader />);
      const inputElement = screen.getByPlaceholderText(
        /Search for pokemon.../i
      ) as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'ditto' } });
      expect(inputElement.value).toBe('ditto');
    });

    it('saves input value in local storage', () => {
      render(<MockHeader />);
      const buttonElement = screen.getByRole('button') as HTMLButtonElement;
      const inputElement = screen.getByPlaceholderText(
        /Search for pokemon.../i
      ) as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: 'ditto' } });
      fireEvent.click(buttonElement);
      expect(localStorage.getItem('PockemonCo')).toBe('ditto');
    });

    it('retrieves the value from local storage upon mounting', () => {
      const initialValue = 'initialValue';
      localStorage.setItem('PockemonCo', initialValue);
      render(<MockHeader />);
      const inputElement = screen.getByPlaceholderText(
        /Search for pokemon.../i
      ) as HTMLInputElement;
      expect(inputElement.value).toBe(initialValue);
    });
  });
});
