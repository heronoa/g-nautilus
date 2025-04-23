import React from "react";
import Image from "next/image";
import { IProfile } from "@/types";
import { Chain, ChevronDown3, Enterprise, Location } from "../icons";
import { redirect } from "next/dist/server/api-utils";

interface ProfileDetailsSectionProps {
  profile: IProfile;
}

export const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({
  profile,
}: ProfileDetailsSectionProps) => {
  return (
    <section className="flex flex-col  items-center  mb-8 w-full max-w-3xl">
      <Image
        width={128}
        height={128}
        src={profile.avatarUrl}
        alt={`Avatar de ${profile.name}`}
        className="w-32 h-32 rounded-full md:mr-6 mb-4"
      />
      <div className="text-center w-full">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-template-gray">{profile.bio}</p>
        <details
          className="group transition-all duration-300 text-template-blue group md:[&[open]]:block md:mt-8"
          open
        >
          <summary className="cursor-pointer mt-4 flex flex-col justify-center items-center md:hidden">
            Informações Adicionais
            <ChevronDown3 className="group-open:rotate-180 md:hidden" />
          </summary>
          <div className="mt-2 transition-all duration-300  md:block group-open:block hidden">
            {[
              { icon: <Enterprise />, text: profile.company },
              { icon: <Location />, text: profile.location },
              { icon: <Chain />, text: profile.blog, redirect },
            ].map((item, index) => {
              if (item.text.trim() === "") return null;

              return (
                <p
                  key={index}
                  className="flex items-center justify-center gap-1 md:gap-2.5 md:justify-start"
                >
                  {item.icon}{" "}
                  {item.redirect ? (
                    <a
                      href={item.text}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-template-blue hover:underline"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </p>
              );
            })}
          </div>
        </details>
      </div>
    </section>
  );
};
