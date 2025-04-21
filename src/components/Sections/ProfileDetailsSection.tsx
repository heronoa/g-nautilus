import React from "react";
import Image from "next/image";
import { IProfile } from "@/types";

interface ProfileDetailsSectionProps {
  profile: IProfile;
}

export const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({
  profile,
}: ProfileDetailsSectionProps) => {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start mb-8 w-full max-w-3xl">
      <Image
        width={128}
        height={128}
        src={profile.avatarUrl}
        alt={`Avatar de ${profile.name}`}
        className="w-32 h-32 rounded-full md:mr-6 mb-4"
      />
      <div className="text-center w-full">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-gray-600">{profile.bio}</p>
      </div>
    </section>
  );
};
