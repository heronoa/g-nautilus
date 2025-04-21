import { renderHook, act } from "@testing-library/react";
import { useSearchStore } from "@/store/SearchState";

describe("useSearchStore", () => {
  beforeEach(() => {
    useSearchStore.setState({
      searchInput: "",
      query: "",
      page: 1,
      perPage: 30,
    });
  });

  it("should set the search searchInput correctly", () => {
    const { setSearchInput } = useSearchStore.getState();
    setSearchInput("GitHub");
    const { searchInput } = useSearchStore.getState();
    expect(searchInput).toBe("GitHub");
  });

  it("should submit the query correctly", () => {
    const { setSearchInput, submitQuery } = useSearchStore.getState();
    setSearchInput("GitHub");
    submitQuery();
    const { query, page } = useSearchStore.getState();
    expect(query).toBe("GitHub");
    expect(page).toBe(1);
  });

  it("should not submit an empty query", () => {
    const { submitQuery } = useSearchStore.getState();
    submitQuery();
    const { query } = useSearchStore.getState();
    expect(query).toBe("");
  });

  it("should reset the state correctly", () => {
    const { setSearchInput, submitQuery, reset } = useSearchStore.getState();
    setSearchInput("GitHub");
    submitQuery();
    reset();
    const { searchInput, query, page, perPage } = useSearchStore.getState();
    expect(searchInput).toBe("");
    expect(query).toBe("");
    expect(page).toBe(1);
    expect(perPage).toBe(30);
  });

  it("should update searchInput correctly in a component", () => {
    const { result } = renderHook(() => useSearchStore());
    act(() => {
      result.current.setSearchInput("GitHub");
    });
    expect(result.current.searchInput).toBe("GitHub");
  });

  it("should submit query correctly in a component", () => {
    const { result } = renderHook(() => useSearchStore());
    act(() => {
      result.current.setSearchInput("GitHub");
      result.current.submitQuery();
    });
    expect(result.current.query).toBe("GitHub");
    expect(result.current.page).toBe(1);
  });

  it("should reset state correctly in a component", () => {
    const { result } = renderHook(() => useSearchStore());
    act(() => {
      result.current.setSearchInput("GitHub");
      result.current.submitQuery();
      result.current.reset();
    });
    expect(result.current.searchInput).toBe("");
    expect(result.current.query).toBe("");
    expect(result.current.page).toBe(1);
    expect(result.current.perPage).toBe(30);
  });
});
