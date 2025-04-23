import React from "react";
import Image from "next/image";
import { IRepository } from "@/types";

interface RepositoryDetailsSectionProps {
  repository: IRepository;
}

export const RepositoryDetailsSection: React.FC<RepositoryDetailsSectionProps> = ({
  repository,
}: RepositoryDetailsSectionProps) => {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start mb-8 w-full max-w-3xl">
      <Image
        width={128}
        height={128}
        src={repository.owner.avatarUrl}
        alt={`Avatar de ${repository.name}`}
        className="w-32 h-32 rounded-full md:mr-6 mb-4 md:mb-0"
      />
      <div className="flex flex-col justify-center items-start">
        <h1 className="w-full text-center md:text-left font-bold text-4xl">
          {repository.owner.login}/{repository.name}
        </h1>
        <p className="text-gray-600">{repository.description}</p>
      </div>
    </section>
  );
};

