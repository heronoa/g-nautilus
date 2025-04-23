import { ProfileFrame } from "@/components";
import { githubService } from "@/services/githubService";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await githubService.getUserProfile(username);
  const repos = await githubService.getAllUserRepos(username);
  const starredRepos = await githubService.getAllUserStarredRepos(username);

  if (!profile.id) {
    return redirect("/404");
  }

  return (
    <ProfileFrame profile={profile} repos={repos} starredRepos={starredRepos} />
  );
}
