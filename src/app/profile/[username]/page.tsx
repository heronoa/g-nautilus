import ProfileFrame from "@/components/Frames/ProfileFrame";
import { githubService } from "@/services/githubService";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await githubService.getUserProfile(username);
  const repos = await githubService.getUserRepos(username, {
    page: 1,
    perPage: 30,
  });
  const starredRepos = await githubService.getUserStarredRepos(username, {
    page: 1,
    perPage: 30,
  });

  return (
    <ProfileFrame profile={profile} repos={repos} starredRepos={starredRepos} />
  );
}
