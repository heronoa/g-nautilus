import React from "react";
import { Compass } from "../icons";

export const HomeHeadingSection: React.FC = () => {
  return (
    <div>
      <section className="mb-6 gap-4 flex">
        <Compass className="w-8 h-8 flex text-blue-500 mb-4" />
        <h1 className="text-lg text-center font-bold">g_nautilus</h1>
      </section>
      <section className="mb-6">
        <h1 className="text-5xl text-left font-bold">
          Explore e busque usuários do GitHub
        </h1>
      </section>
    </div>
  );
};
