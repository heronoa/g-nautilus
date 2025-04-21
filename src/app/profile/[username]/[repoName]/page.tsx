import { RepositoryFrame } from "@/components/Frames/RepositoryFrame";
import { githubService } from "@/services/githubService";

interface ProfilePageProps {
  params: Promise<{
    username: string;
    repoName: string;
  }>;
}

export default async function RepositoryPage({ params }: ProfilePageProps) {
  const { username, repoName } = await params;
  const repository = await githubService.getRepo(username, repoName);
  const issues = await githubService.getAllIssues(username, repoName);

  return <RepositoryFrame repository={repository} issues={issues} />;
}
