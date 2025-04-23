import { IPaginationReturn, IProfile, IRepository } from "@/types";
import { ProfileDetailsSection, ProfileRepoTabsSection } from "@/components";

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
    <main className="flex flex-col justify-center md:items-start items-center mx-auto px-4 py-8 md:grid grid-cols-3 gap-4 w-full lg:max-w-5xl ">
      <ProfileDetailsSection profile={profile} />

      <ProfileRepoTabsSection
        profile={profile}
        repos={repos}
        starredRepos={starredRepos}
        className="col-span-2 w-full max-w-3xl"
      />
    </main>
  );
};
