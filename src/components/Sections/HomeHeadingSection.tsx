import React from "react";
import { Compass } from "../icons";
import BackButton from "../ui/BackButton";

interface HeadingProps {
  back?: boolean;
  headTitle?: boolean;
}

export const HomeHeadingSection: React.FC<HeadingProps> = ({
  back = false,
  headTitle = true,
}: HeadingProps) => {
  return (
    <div className="w-full">
      <section className="mb-6 flex items-center justify-between">
        <div className="flex gap-4 items-center justify-center">
          <Compass className="w-8 h-8 flex text-blue-500 " />
          <h1 className="text-lg text-center font-bold">g_nautilus</h1>
        </div>
        <div>{back && <BackButton />}</div>
      </section>
      {headTitle && (
        <section className="mb-6">
          <h1 className="text-5xl text-left font-bold">
            Explore e busque usuários do GitHub
          </h1>
        </section>
      )}
    </div>
  );
};
