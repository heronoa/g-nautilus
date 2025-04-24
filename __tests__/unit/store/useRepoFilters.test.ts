import { act } from "@testing-library/react";
import { useFilterRepoState } from "@/store/FilterRepoState";
import { mockRepos } from "@/tests/mocks";

describe("useFilterRepoState", () => {
  beforeEach(() => {
    useFilterRepoState.setState({ filteredRepos: [] });
  });

  it("should set the filtered repositories correctly", () => {
    const { setFilteredRepos } = useFilterRepoState.getState();
    act(() => {
      setFilteredRepos(mockRepos);
    });

    const { filteredRepos } = useFilterRepoState.getState();
    expect(filteredRepos).toEqual(mockRepos);
  });

  it("should reset the filtered repositories correctly", () => {
    const { setFilteredRepos } = useFilterRepoState.getState();
    act(() => {
      setFilteredRepos(mockRepos);
    });

    act(() => {
      useFilterRepoState.setState({ filteredRepos: [] });
    });

    const { filteredRepos } = useFilterRepoState.getState();
    expect(filteredRepos).toEqual([]);
  });
});
