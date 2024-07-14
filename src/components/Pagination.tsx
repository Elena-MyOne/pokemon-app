import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { ITEMS_PER_PAGE } from '../constants/api';

export interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPokemons: number | null;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPokemons,
}: PaginationProps) {
  const lastPage = totalPokemons ? Math.floor(totalPokemons / ITEMS_PER_PAGE) : 1;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center my-6 gap-4">
      <button
        className={`${currentPage === 1 ? 'bg-gray-200 opacity-35' : 'bg-gray-50 cursor-pointer hover:bg-yellow-300'} border border-gray-100 p-2   duration-300 `}
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
        data-testid="prev-button"
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <div
        className="border border-gray-100 py-1 px-2 bg-gray-50 duration-300 "
        data-testid="current-button"
      >
        {currentPage}
      </div>

      <button
        className="border border-gray-100 p-2 bg-gray-50 cursor-pointer duration-300 hover:bg-yellow-300"
        disabled={currentPage === lastPage}
        onClick={handleNextPage}
        data-testid="next-button"
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
}
