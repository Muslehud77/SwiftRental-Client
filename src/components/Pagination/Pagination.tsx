import { motion } from 'framer-motion';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type TMeta = {
  total: number;
  pageNumber: number;
  limitDataCount: number;
  totalPage: number;
};

type TPaginateProps = {
  meta: TMeta | undefined;
  setPage: (page: number) => void;
};

export function Paginate({ meta, setPage }: TPaginateProps) {


  const pageNumber = meta?.pageNumber
  const totalPage = meta?.totalPage

  const arr = [...Array(totalPage).keys()].map((i) => i + 1);

  return (
    <motion.div layout>

    <Pagination>
      <PaginationContent className="cursor-pointer md:cursor-none ">
        {pageNumber > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(pageNumber - 1)} />
          </PaginationItem>
        )}

        {arr.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setPage(page)}
              isActive={page === pageNumber}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

     
        {totalPage !== pageNumber && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(pageNumber + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
    </motion.div>
  );
}
