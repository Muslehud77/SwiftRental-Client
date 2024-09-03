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
  meta: TMeta;
  setPage: (page: number) => void;
};

export function Paginate({ meta, setPage }: TPaginateProps) {
  const { pageNumber, totalPage } = meta;

  const arr = [...Array(totalPage).keys()].map((i) => i + 1);

  return (
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

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {totalPage !== pageNumber && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(pageNumber + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
