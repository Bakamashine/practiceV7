import { Pagination } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";

interface AdaptivePaginatorProps {
  page: number;
  pageCount: number;
}

export default function AdaptivePaginator({ page, pageCount }: AdaptivePaginatorProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (pageCount <= 1) return null;

  const goToPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.First disabled={page === 1} onClick={() => goToPage(1)} />
      <Pagination.Prev disabled={page === 1} onClick={() => goToPage(page - 1)} />

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <Pagination.Item key={p} active={p === page} onClick={() => goToPage(p)}>
          {p}
        </Pagination.Item>
      ))}

      <Pagination.Next disabled={page === pageCount} onClick={() => goToPage(page + 1)} />
      <Pagination.Last disabled={page === pageCount} onClick={() => goToPage(pageCount)} />
    </Pagination>
  );
}
