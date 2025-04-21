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
        <TabsList className="flex gap-4 p-2 bg-gray-100 dark:bg-zinc-800 rounded-md">
          <TabsTrigger
            className="flex-1 flex justify-center items-center cursor-pointer"
            value="repositories"
          >
            <div className="flex items-center gap-2">
              <Bookmark /> Repositórios {repos.totalCount}
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 flex justify-center items-center cursor-pointer"
            value="starred"
          >
            <div className="flex items-center gap-2">
              <IconsStar /> Starred {starredRepos.totalCount}
            </div>
          </TabsTrigger>
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
