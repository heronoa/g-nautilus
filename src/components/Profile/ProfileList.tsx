import { IProfile } from "@/types";
import ProfileCard from "../Profile/ProfileCard";
import { AnimatedCardWrapper } from "../Animation";

interface Props {
  profiles: IProfile[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const ProfileList: React.FC<Props> = ({
  profiles,
  isLoading,
  hasSearched,
}) => {
  if (!isLoading && hasSearched && profiles.length === 0) {
    return <p className="text-muted-foreground">Nenhum usuário encontrado.</p>;
  }

  if (!isLoading && profiles.length > 0) {
    return (
      <section className="space-y-4">
        {profiles.map((profile: IProfile) => (
          <AnimatedCardWrapper key={profile.id} className="flex flex-col gap-4">
            <ProfileCard profile={profile} />
          </AnimatedCardWrapper>
        ))}
      </section>
    );
  }

  return null;
};
