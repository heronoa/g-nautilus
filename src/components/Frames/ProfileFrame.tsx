import { IProfile, IRepository } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import RepositoryCard from "../Repository/RepositoryCard";
import SvgBookmark from "../icons/Bookmark";
import { IconsStar } from "../icons";

interface ProfileFrameProps {
  profile: IProfile;
  repos: IRepository[];
  starredRepos: IRepository[];
}
const ProfileFrame: React.FC<ProfileFrameProps> = ({
  profile,
  repos,
  starredRepos,
}: ProfileFrameProps) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row items-center md:items-start mb-8">
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
              className="flex-1 flex justify-center items-center"
              value="repositories"
            >
              <div className="flex items-center gap-2">
                <SvgBookmark /> Repositórios {repos.length}
              </div>
            </TabsTrigger>
            <TabsTrigger
              className="flex-1 flex justify-center items-center"
              value="starred"
            >
              <div className="flex items-center gap-2">
                <IconsStar /> Favoritos {starredRepos.length}
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="repositories">
            <div className="grid gap-4 mt-4">
              {repos.map((repo: IRepository) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="starred">
            <div className="grid gap-4 mt-4">
              {starredRepos.map((repo: IRepository) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};
export default ProfileFrame;
