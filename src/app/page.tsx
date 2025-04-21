import { SearchSection } from "@/components";
import { HomeHeadingSection } from "@/components";

const HomePage: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto p-4 relative">
      <HomeHeadingSection />

      <SearchSection />
    </main>
  );
};

export default HomePage;
