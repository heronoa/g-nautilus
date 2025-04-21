import { IPaginationReturn, IProfile, IRepository } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { IconsStar, Bookmark, RepositoryCard } from "@/components";
import Link from "next/link";

interface ProfileRepoTabsSectionProps {
  profile: IProfile;
  repos: IPaginationReturn<IRepository>;
  starredRepos: IPaginationReturn<IRepository>;
}

export const ProfileRepoTabsSection: React.FC<ProfileRepoTabsSectionProps> = ({
  profile,
  repos,
  starredRepos,
}) => {
  return (
    <section className="w-full max-w-3xl">
      <Tabs defaultValue="repositories" className="w-full flex flex-col">
        <TabsList className="flex gap-4 p-2  dark:bg-zinc-800 rounded-md">
          {[
            {
              value: "repositories",
              icon: <Bookmark />,
              label: "Repositórios",
              count: repos.totalCount,
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
              className="flex-1 flex justify-center items-center cursor-pointer  relative group"
              value={tab.value}
            >
              <div className="flex items-center gap-2">
                {tab.icon} {tab.label}
                <span className="w-10 h-6 rounded-full border solid border-gray-200">
                  {tab.count}
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

        <TabsContent value="repositories">
          <div className="grid gap-4 mt-4">
            {repos.items.map((repo: IRepository) => (
              <Link
                key={repo.id}
                href={`/profile/${profile.login}/${repo.name}`}
                className="cursor-pointer"
              >
                <RepositoryCard repository={repo} />
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred">
          <div className="grid gap-4 mt-4">
            {starredRepos.items.map((repo: IRepository) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
