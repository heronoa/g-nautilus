import { Button } from "@/components/ui/button";

interface Props {
  itemsLength: number;
  totalCount: number;
  isFetching: boolean;
  hasSearched?: boolean;
  handleLoadMore: () => void;
}

export const LoadMoreButton: React.FC<Props> = ({
  itemsLength,
  totalCount,
  isFetching,
  hasSearched = true,
  handleLoadMore,
}) => {
  const show = hasSearched && !isFetching && itemsLength < totalCount;

  if (!show) return null;

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={handleLoadMore}
        disabled={isFetching}
        variant="gradient"
        className="cursor-pointer w-full px-12 md:w-fit"
      >
        {isFetching ? "Carregando..." : "Carregar mais"}
      </Button>
    </div>
  );
};
