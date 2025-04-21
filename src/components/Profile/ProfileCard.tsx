import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProfile } from "@/types";

interface ProfileCardProps {
  profile: IProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div
      key={profile.id}
      className="flex items-center gap-4 border p-2 rounded"
    >
      <Image
        width={48}
        height={48}
        src={profile.avatarUrl}
        alt={`Avatar de ${profile.login}`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <Link
          href={`/profile/${profile.login}`}
          className="text-blue-600 hover:underline"
        >
          {profile.login}
        </Link>

        <a href={profile.htmlUrl} target="_blank" rel="noopener noreferrer">
          <p className="text-sm text-muted-foreground">{profile.htmlUrl}</p>
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
