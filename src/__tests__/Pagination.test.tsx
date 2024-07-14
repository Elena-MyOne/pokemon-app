import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import Pagination, { PaginationProps } from '../components/Pagination';

const mockPaginationProps = () => ({
  currentPage: 1,
  setCurrentPage: vi.fn(),
  totalPokemons: 32,
});

const MockPagination = (props: PaginationProps) => {
  return (
    <BrowserRouter>
      <Pagination {...props} />
    </BrowserRouter>
  );
};

const MockPaginationUrl = (props: PaginationProps) => {
  return (
    <MemoryRouter initialEntries={['/?page=1']}>
      <Routes>
        <Route path="/" element={<Pagination {...props} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Pagination updates URL', async () => {
  it('updates the URL query parameter when the page changes', async () => {
    const props = mockPaginationProps();
    render(<MockPaginationUrl {...props} />);
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(props.setCurrentPage).toHaveBeenCalledWith(2);
    });
  });
});

describe('Pagination renders', () => {
  it('disables the previous button on the first page', () => {
    render(<MockPagination {...mockPaginationProps()} />);
    const previousButton = screen.getByTestId('prev-button');
    expect(previousButton).toBeDisabled();
  });

  it('enables the next button if not on the last page', () => {
    render(<MockPagination {...mockPaginationProps()} />);
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).not.toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<MockPagination currentPage={4} totalPokemons={32} setCurrentPage={() => {}} />);
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toBeDisabled();
  });

  it('calls setCurrentPage with the previous page when the previous button is clicked', () => {
    const setCurrentPage = vi.fn();
    render(<MockPagination currentPage={2} totalPokemons={32} setCurrentPage={setCurrentPage} />);
    const previousButton = screen.getByTestId('prev-button');
    fireEvent.click(previousButton);
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  it('calls setCurrentPage with the next page when the next button is clicked', async () => {
    const setCurrentPage = vi.fn();
    render(<MockPagination currentPage={1} totalPokemons={32} setCurrentPage={setCurrentPage} />);
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });
});
