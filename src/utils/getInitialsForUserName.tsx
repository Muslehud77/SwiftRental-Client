export function getInitials(username: string) {
  const words = username?.split(" ");

  const initials = words
    .map((word: string) => word.charAt(0))
    .join("")
    .toUpperCase();

  return initials;
}
