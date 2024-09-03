import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";

import scrollToTop from "../../utils/scrollToTop";

import { Helmet } from "react-helmet-async";

type TQuery = {
  searchTerm?: string;
  page: number;
  limit: number;
  sort?: string;
  priceRange?: number;
  category?: string;
};

export default function ManageCars() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<TQuery>({ page, limit: 8 });

  useEffect(() => {
    const handler = setTimeout(() => {
      const query: TQuery = {
        page,
        limit: 8,
      };

      if (searchTerm) {
        query["searchTerm"] = searchTerm;
      }

      if (filter !== query) {
        setFilter(query);
        scrollToTop();
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, page]);

  return (
    <div className="px-8 mx-auto py-6 border dark:border-none rounded-xl text-foreground bg-secondary mb-10">
      <Helmet>
        <title>Dashboard | Manage Products</title>
      </Helmet>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Products</h1>

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md bg-background"
          />
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
