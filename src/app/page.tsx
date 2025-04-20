import { Compass } from "@/components/icons";
import SearchForm from "@/components/Profile/SearchForm";

const HomePage: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto p-4 relative">
      <section className="mb-6 gap-4 flex">
        <Compass className="w-8 h-8 flex text-blue-500 mb-4" />
        <h1 className="text-lg  text-center font-bold">g_nautilus</h1>
      </section>
      <section className="mb-6">
        <h1 className="text-5xl text-left font-bold">
          Explore e busque usuários do GitHub
        </h1>
      </section>

      <SearchForm />
    </main>
  );
};

export default HomePage;
