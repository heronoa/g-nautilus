import { IPaginationReturn, IProfile, IRepository } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { IconsStar, Bookmark, RepositorySearchSection } from "@/components";

interface ProfileRepoTabsSectionProps {
  profile: IProfile;
  repos: IPaginationReturn<IRepository>;
  starredRepos: IPaginationReturn<IRepository>;
  totalCountRepos: number;
  className?: string;
}

export const ProfileRepoTabsSection: React.FC<ProfileRepoTabsSectionProps> = ({
  profile,
  repos,
  starredRepos,
  className,
  totalCountRepos,
}) => {
  return (
    <section className={`w-full max-w-3xl ${className}`}>
      <Tabs defaultValue="repositories" className="w-full flex flex-col">
        <TabsList className="flex gap-4 p-2 rounded-md">
          {[
            {
              value: "repositories",
              icon: <Bookmark />,
              label: "Repositórios",
              count: totalCountRepos || repos.totalCount,
            },
            {
              value: "starred",
              icon: <IconsStar />,
              label: "Starred",
              count: starredRepos.totalCount,
            },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="flex-1 flex justify-center items-center cursor-pointer data-[state=inactive]:opacity-50 relative group"
              value={tab.value}
            >
              <div className="flex items-center gap-2">
                {tab.icon} {tab.label}
                <span className="w-10 h-6 rounded-full border solid bg-[#F8F8F8] border-gray-[#DBDBDB]">
                  {tab.count || 0}
                </span>
              </div>
              {tab.value === "repositories" && (
                <div
                  className={
                    "absolute w-full h-1 bg-[#FD8C73] group-data-[state=inactive]:left-[calc(100%_+_16px)] left-0 -bottom-4 right-0 transition-all duration-200"
                  }
                ></div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {[
          {
            value: "repositories",
            displayRepo: repos,
            totalCountRepos: totalCountRepos,
            emptyMessage: "Nenhum repositório encontrado",
            emptyDescription: `${profile.login} não tem repositórios.`,
          },
          {
            value: "starred",
            displayRepo: starredRepos,
            emptyMessage: "Nenhum repositório com estrela encontrado",
            emptyDescription: `${profile.login} não tem repositórios com estrela.`,
          },
        ].map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="grid gap-4 mt-4">
              {tab.displayRepo.items.length <= 0 && (
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-md shadow-md">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {tab.emptyMessage}
                  </h2>
                  <p className="text-gray-500">{tab.emptyDescription}</p>
                </div>
              )}
              {tab.displayRepo.items.length > 0 && (
                <RepositorySearchSection
                  repos={tab.displayRepo}
                  username={profile.login}
                  starred={tab.value === "starred"}
                  totalCount={totalCountRepos || tab.displayRepo.totalCount}
                />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
