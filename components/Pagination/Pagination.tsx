import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    if (newPage !== currentPage) {
      // Додано перевірку
      onPageChange(newPage);
    }
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange} // Використовуємо обробник
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
