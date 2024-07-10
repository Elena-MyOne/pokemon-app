import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ currentPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center my-6 gap-4">
      <div className="border border-gray-100 p-2 bg-gray-50 cursor-pointer duration-300 hover:bg-yellow-300">
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      <div className="border border-gray-100 py-1 px-2 bg-gray-50 cursor-pointer duration-300 hover:bg-yellow-300">
        {currentPage}
      </div>
      <div className="border border-gray-100 p-2 bg-gray-50 cursor-pointer duration-300 hover:bg-yellow-300">
        <MdOutlineKeyboardDoubleArrowRight />
      </div>
    </div>
  );
}
