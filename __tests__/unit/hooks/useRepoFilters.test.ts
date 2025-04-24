import { renderHook, act } from "@testing-library/react";
import { useFilter } from "@/hooks/useRepoFilters";
import { filterAndSortRepos } from "@/utils/filterRepos";
import { useFilterRepoState } from "@/store/FilterRepoState";
import { IPaginationReturn, IRepository } from "@/types";
import { mockRepos } from "@/tests/mocks";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));
jest.mock("@/utils/filterRepos", () => ({
  filterAndSortRepos: jest.fn(),
}));

jest.mock("@/store/FilterRepoState", () => ({
  useFilterRepoState: jest.fn(),
}));

describe("useFilter", () => {
  const mockSetFilteredRepos = jest.fn();
  const mockRouterReplace = jest.fn();
  const mockRouter = {
    replace: mockRouterReplace,
  } as Partial<AppRouterInstance>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useFilterRepoState as unknown as jest.Mock).mockReturnValue({
      setFilteredRepos: mockSetFilteredRepos,
    });
  });

  it("should initialize with correct default values", () => {
    const searchParams = new URLSearchParams();
    const repos: IPaginationReturn<IRepository> = { items: [], totalCount: 0 };

    const { result } = renderHook(() =>
      useFilter(
        repos,
        mockRouter as AppRouterInstance,
        "/test-path",
        searchParams
      )
    );

    expect(result.current.searchValue).toBe("");
    expect(result.current.selectedLanguages).toEqual([]);
    expect(result.current.selectedTypes).toEqual([]);
  });

  it("should parse selectedLanguages and selectedTypes from searchParams", () => {
    const searchParams = new URLSearchParams({
      languages: "JavaScript,TypeScript",
      types: "Fork,Source",
    });
    const repos: IPaginationReturn<IRepository> = { items: [], totalCount: 0 };

    const { result } = renderHook(() =>
      useFilter(
        repos,
        mockRouter as AppRouterInstance,
        "/test-path",
        searchParams
      )
    );

    expect(result.current.selectedLanguages).toEqual([
      { value: "JavaScript", label: "JavaScript" },
      { value: "TypeScript", label: "TypeScript" },
    ]);
    expect(result.current.selectedTypes).toEqual([
      { value: "Fork", label: "Fork" },
      { value: "Source", label: "Source" },
    ]);
  });

  it("should update filteredRepos when dependencies change", () => {
    const searchParams = new URLSearchParams();
    const repos: IPaginationReturn<IRepository> = {
      items: mockRepos,
      totalCount: mockRepos.length,
    };

    (filterAndSortRepos as jest.Mock).mockReturnValue([
      { id: 1, name: "Repo 1" },
    ]);

    renderHook(() =>
      useFilter(
        repos,
        mockRouter as AppRouterInstance,
        "/test-path",
        searchParams
      )
    );

    expect(filterAndSortRepos).toHaveBeenCalledWith(
      repos.items,
      expect.any(Object)
    );
    expect(mockSetFilteredRepos).toHaveBeenCalledWith([
      { id: 1, name: "Repo 1" },
    ]);
  });

  it("should update searchValue when setSearchValue is called", () => {
    const searchParams = new URLSearchParams();
    const repos: IPaginationReturn<IRepository> = { items: [], totalCount: 0 };

    const { result } = renderHook(() =>
      useFilter(
        repos,
        mockRouter as AppRouterInstance,
        "/test-path",
        searchParams
      )
    );

    act(() => {
      result.current.setSearchValue("new value");
    });

    expect(result.current.searchValue).toBe("new value");
  });

  it("should ignore empty strings in selectedLanguages", () => {
    const searchParams = new URLSearchParams({
      languages: "JavaScript,,TypeScript, ",
    });
    const repos: IPaginationReturn<IRepository> = { items: [], totalCount: 0 };

    const { result } = renderHook(() =>
      useFilter(
        repos,
        mockRouter as AppRouterInstance,
        "/test-path",
        searchParams
      )
    );

    expect(result.current.selectedLanguages).toEqual([
      { value: "JavaScript", label: "JavaScript" },
      { value: "TypeScript", label: "TypeScript" },
    ]);
  });

  it("should disable all specific filters if 'All' is selected", () => {
    const searchParams = new URLSearchParams({
      types: "All,Fork,Source,Archived",
    });

    const repos: IPaginationReturn<IRepository> = {
      items: mockRepos,
      totalCount: mockRepos.length,
    };

    (filterAndSortRepos as jest.Mock).mockReturnValue([
      { id: 1, name: "Repo 1" },
    ]);

    renderHook(() =>
      useFilter(
        repos,
        mockRouter as AppRouterInstance,
        "/test-path",
        searchParams
      )
    );

    expect(filterAndSortRepos).toHaveBeenCalledWith(
      mockRepos,
      expect.objectContaining({
        onlyForks: false,
        onlySources: false,
        onlyArchived: false,
        onlyMirrors: false,
      })
    );
  });
});
