import avatarPlaceholder from "../_assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
  size?: number;
  className?: string;
}

export default function UserAvatar({ size, className }: UserAvatarProps) {
  return (
    <Image
      src={avatarPlaceholder}
      alt="User avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
}
