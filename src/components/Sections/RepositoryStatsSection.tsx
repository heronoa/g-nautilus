import React from "react";
import { BranchRegular, IconsStar, Bookmark } from "@/components";

interface RepositoryStatsSectionProps {
  starCount: number;
  forkCount: number;
  issueTotalCount: number;
}

export const RepositoryStatsSection: React.FC<RepositoryStatsSectionProps> = ({
  starCount,
  forkCount,
  issueTotalCount,
}: RepositoryStatsSectionProps) => {
  return (
    <aside className="flex flex-row items-center justify-around md:justify-start w-full max-w-3xl mb-8">
      {[
        {
          name: "Forks",
          qty: forkCount,
          icon: <BranchRegular className="!text-gray-500" />,
        },
        {
          name: "Stars",
          qty: starCount,
          icon: <IconsStar className="!text-gray-500" />,
        },
        {
          name: "Issues",
          qty: issueTotalCount,
          icon: <Bookmark className="!text-gray-500" />,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2 text-center p-4 rounded-md"
        >
          <div className="text text-3xl">{item.qty}</div>
          <div className="text-gray-500 flex justify-center items-center gap-2 mb-2">
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        </div>
      ))}
    </aside>
  );
};
