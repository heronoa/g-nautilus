import { IPaginationReturn, IProfile, IRepository } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import { IconsStar, Bookmark, RepositoryCard } from "@/components";
import Link from "next/link";

interface ProfileFrameProps {
  profile: IProfile;
  repos: IPaginationReturn<IRepository>;
  starredRepos: IPaginationReturn<IRepository>;
}
export const ProfileFrame: React.FC<ProfileFrameProps> = ({
  profile,
  repos,
  starredRepos,
}: ProfileFrameProps) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center md:items-start mb-8 w-full max-w-3xl">
        <Image
          width={128}
          height={128}
          src={profile.avatarUrl}
          alt={`Avatar de ${profile.name}`}
          className="w-32 h-32 rounded-full mr-6"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </section>

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
                <IconsStar /> Favoritos {starredRepos.totalCount}
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
    </div>
  );
};
