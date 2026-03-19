export type DockerPsItem = {
  ID?: string;
  Image?: string;
  Names?: string;
  Status?: string;
  RunningFor?: string;
};

export const parseDockerPs = (raw: string): DockerPsItem[] => {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as DockerPsItem;
      } catch {
        return null;
      }
    })
    .filter((item): item is DockerPsItem => Boolean(item));
};
