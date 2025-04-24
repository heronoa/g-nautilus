import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/SearchState";

interface Props {
  profilesLength: number;
  totalCount: number;
  isFetching: boolean;
  hasSearched: boolean;
}

export const LoadMoreButton: React.FC<Props> = ({
  profilesLength,
  totalCount,
  isFetching,
  hasSearched,
}) => {
  const show = hasSearched && !isFetching && profilesLength < totalCount;

  const handleLoadMore = () => {
    if (!isFetching) {
      useSearchStore.setState((state) => ({ page: state.page + 1 }));
    }
  };

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
