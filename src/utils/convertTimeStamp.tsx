export function convertTimestamp(isoTimestamp:string) {
  const date = new Date(isoTimestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",

    timeZoneName: "short",
  } as Record<string,string>;

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
