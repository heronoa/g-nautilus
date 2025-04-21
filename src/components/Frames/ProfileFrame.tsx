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
    <main className="flex flex-col justify-center items-center mx-auto px-4 py-8">
      <ProfileDetailsSection profile={profile} />

      <ProfileRepoTabsSection
        profile={profile}
        repos={repos}
        starredRepos={starredRepos}
      />
    </main>
  );
};
