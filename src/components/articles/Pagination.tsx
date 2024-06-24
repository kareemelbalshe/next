import Link from "next/link";
import React from "react";

interface PaginationProps {
  pageNumber: number;
  pages: number;
  route: string;
}
const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className="flex items-center justify-center mt-2 mb-10">
      {pageNumber !== 1 && (
        <Link href={`${route}?pageNumber=${pageNumber - 1}`} className="py-1 border px-3 border-gray-700 text-gray-700 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
        Prev
      </Link>
      )}
      {pagesArray.map((page) => (
        <Link href={`${route}?pageNumber=${page}`} key={page}
          className={`${pageNumber === page ? "bg-gray-400" : ""} py-1 border px-3 border-gray-700 text-gray-700 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link href={`${route}?pageNumber=${pageNumber + 1}`} className="py-1 border px-3 border-gray-700 text-gray-700 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
        Next
      </Link>
      )}
    </div>
  );
};

export default Pagination;
