import { renderHook, act } from "@testing-library/react";
import { useAppStore } from "@/store/AppState";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({ selectedUsername: null, selectedRepo: null });
  });

  it("should set the selected user correctly", () => {
    const { setselectedUsername } = useAppStore.getState();
    setselectedUsername("octocat");
    const { selectedUsername } = useAppStore.getState();
    expect(selectedUsername).toBe("octocat");
  });

  it("should set the selected repository correctly", () => {
    const { setSelectedRepo } = useAppStore.getState();
    setSelectedRepo("octocat/hello-world");
    const { selectedRepo } = useAppStore.getState();

    expect(selectedRepo).toBe("octocat/hello-world");
  });

  it("should reset the state correctly", () => {
    const { setselectedUsername, setSelectedRepo, reset } =
      useAppStore.getState();
    setselectedUsername("octocat");
    setSelectedRepo("octocat/hello-world");
    reset();
    const { selectedUsername, selectedRepo } = useAppStore.getState();
    expect(selectedUsername).toBeNull();
    expect(selectedRepo).toBeNull();
  });

  it("deve atualizar selectedUsername corretamente em um componente", () => {
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.setselectedUsername("octocat");
    });
    expect(result.current.selectedUsername).toBe("octocat");
  });
});
